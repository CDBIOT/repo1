const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const express = require('express');
const { body, validationResult } = require('express-validator');
const socketIO = require('socket.io');
const qrcode = require('qrcode');
const http = require('http');
const fileUpload = require('express-fileupload');
//const axios = require('axios');
const mime = require('mime-types');
const port = process.env.PORT || 3000 || 8000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

function delay(t, v) {
  return new Promise(function(resolve) { 
      setTimeout(resolve.bind(null, v), t)
  });
}

 app.use(express.json());
app.use(express.urlencoded({
extended: true
}));
app.use(fileUpload({
debug: true
}));
 //app.use("/", express.static(__dirname + "/"))

//  app.get('/api', (req, res) => {
//    res.sendFile('index.html', {
//      root: __dirname
//  });
//  });
// 
const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'bot-zdg' }),
  puppeteer: { headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ] }
});

client.initialize();

io.on('connection', function(socket) {
  socket.emit('message', '© BOT CDB - Iniciado');
  socket.emit('qr', './icon.svg');
  console.log(`Socket conectado: ${socket.id}`)

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.toDataURL(qr, (err, url) => {
      socket.emit('qr', url);
      socket.emit('message', '© BOT-CDB QRCode recebido, aponte a câmera  seu celular!');
    });
});

client.on('ready', () => {
    socket.emit('ready', '© BOT-CDB Dispositivo pronto!');
    socket.emit('message', '© BOT-CDB Dispositivo pronto!');
    socket.emit('qr', './check.svg')	
    console.log('© BOT-ZDG Dispositivo pronto');
});

client.on('authenticated', () => {
    socket.emit('authenticated', '© BOT-CDB Autenticado!');
    socket.emit('message', '© BOT-CDB Autenticado!');
    console.log('© BOT-ZDG Autenticado');
});

client.on('auth_failure', function() {
    socket.emit('message', '© BOT CDB Falha na autenticação, reiniciando...');
    console.error('© BOT-ZDG Falha na autenticação');
});

client.on('change_state', state => {
  console.log('© BOT-ZDG Status de conexão: ', state );
});

client.on('disconnected', (reason) => {
  socket.emit('message', '© BOT CDB Cliente desconectado!');
  console.log('© BOT-ZDG Cliente desconectado', reason);
  client.initialize();
});
});

// Send message
app.post('/zdg-message', [
  body('number').notEmpty(),
  body('message').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  const number = req.body.number;
  const numberDDI = number.substr(0, 2);
  const numberDDD = number.substr(2, 2);
  const numberUser = number.substr(-8, 8);
  const message = req.body.message;

  if (numberDDI !== "55") {
    const numberZDG = number + "@c.us";
    client.sendMessage(numberZDG, message).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Mensagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Mensagem não enviada',
      response: err.text
    });
    });
  }
  else if (numberDDI === "55" && parseInt(numberDDD) <= 30) {
    const numberZDG = "55" + numberDDD + "9" + numberUser + "@c.us";
    client.sendMessage(numberZDG, message).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Mensagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Mensagem não enviada',
      response: err.text
    });
    });
  }
  else if (numberDDI === "55" && parseInt(numberDDD) > 30) {
    const numberZDG = "55" + numberDDD + numberUser + "@c.us";
    client.sendMessage(numberZDG, message).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Mensagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Mensagem não enviada',
      response: err.text
    });
    });
  }
});


// Send media
app.post('/zdg-media', [
  body('number').notEmpty(),
  body('caption').notEmpty(),
  body('file').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  const number = req.body.number;
  const numberDDI = number.substr(0, 2);
  const numberDDD = number.substr(2, 2);
  const numberUser = number.substr(-8, 8);
  const caption = req.body.caption;
  const fileUrl = req.body.file;

  let mimetype;
  const attachment = await axios.get(fileUrl, {
    responseType: 'arraybuffer'
  }).then(response => {
    mimetype = response.headers['content-type'];
    return response.data.toString('base64');
  });

  const media = new MessageMedia(mimetype, attachment, 'Media');

  if (numberDDI !== "55") {
    const numberZDG = number + "@c.us";
    client.sendMessage(numberZDG, media, {caption: caption}).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Imagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Imagem não enviada',
      response: err.text
    });
    });
  }
  else if (numberDDI === "55" && parseInt(numberDDD) <= 30) {
    const numberZDG = "55" + numberDDD + "9" + numberUser + "@c.us";
    client.sendMessage(numberZDG, media, {caption: caption}).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Imagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Imagem não enviada',
      response: err.text
    });
    });
  }
  else if (numberDDI === "55" && parseInt(numberDDD) > 30) {
    const numberZDG = "55" + numberDDD + numberUser + "@c.us";
    client.sendMessage(numberZDG, media, {caption: caption}).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Imagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Imagem não enviada',
      response: err.text
    });
    });
  }
});

client.on('message', async msg => {

  const nomeContato = msg._data.notifyName;
  let groupChat = await msg.getChat();
  
  // if (groupChat.isGroup) return null;

  if (msg.type.toLowerCase() == "e2e_notification") return null;
  
  if (msg.body == "") return null;
  
  if (msg.from.includes("@g.us")) return null;

  if (msg.body !== null && msg.body === "1") {
    //msg.reply("*COMUNIDADE ZDG*\n\n🤪 _Usar o WPP de maneira manual é prejudicial a saúde_\r\n\r\nhttps://comunidadezdg.com.br/ \r\n\r\n⏱️ As inscrições estão *ABERTAS*\n\nAssista o vídeo abaixo e entenda porque tanta gente comum está economizando tempo e ganhando dinheiro explorando a API do WPP, mesmo sem saber nada de programação.\n\n📺 https://youtu.be/mr0BvO9quhw");
    msg.reply("Na *Comunidade ZDG* você vai integrar APIs, automações com chatbots e sistemas de atendimento multiusuário para whatsapp. Com *scripts para copiar e colar e suporte todos os dias no grupo de alunos*.\n\nhttps://comunidadezdg.com.br/ \n\n*⏱️ API do WPP\n\n📺 https://www.youtube.com/watch?v=AoRhC_X6p5w")
  } 
  
  else if (msg.body !== null && msg.body === "2") {
    msg.reply("*" + nomeContato + "*, na Comunidade ZDG, você vai:\n\n- ");
  }
  
  else if (msg.body !== null && msg.body === "3") {
    msg.reply("*" + nomeContato + "*, " + "essas são as principais APIs que a ZDG vai te ensinar a usar com o WhatsApp:\nBaileys, Venom-BOT, WPPConnect, WPPWeb-JS e Cloud API (Api Oficial)\n\n*Essas são as principais integrações que a ZDG vai te ensinar a fazer com o WhatsApp:*\nBubble, WordPress (WooCommerce e Elementor), Botpress, N8N, DialogFlow, ChatWoot e plataformas como Hotmart, Edduz, Monetizze, Rd Station, Mautic, Google Sheets, Active Campaing, entre outras.");
  }
  
  else if (msg.body !== null && msg.body === "4") {

        const contact = await msg.getContact();
        setTimeout(function() {
            msg.reply(`@${contact.number}` + ' seu contato já foi encaminhado para o Pedrinho');  
            client.sendMessage('5515998566622@c.us','Contato ZDG. https://wa.me/' + `${contact.number}`);
	    //client.sendMessage('5515998566622@c.us',`${contact.number}`);
          },1000 + Math.floor(Math.random() * 1000));
  
  }
  
  else if (msg.body !== null && msg.body === "4") {
    msg.reply("Seu contato já foi encaminhado para o Pedrinho");
  }
  
  else if (msg.body !== null && msg.body === "5") {
    msg.reply("*" + nomeContato + "*, " + "aproveite o conteúdo e aprenda em poucos minutos como colocar sua API de WPP no ar, gratuitamente:\r\n\r\n🎥 https://youtu.be/sF9uJqVfWpg");
  }
  
  else if (msg.body !== null && msg.body === "7") {
    msg.reply("*" + nomeContato + "*, " + ", https://youtu.be/StRiSLS5ckg\nRodrigo: Eu sou desenvolvedor de sistemas, https://youtu.be/sAJUDsUHZOw\nDarley:");
  }

	 else if (msg.body !== null || msg.body === "0" || msg.type === 'ptt' || msg.hasMedia) {
    msg.reply("*COMUNIDADE ZDG*\n\n🤪 _Usar o WPP de maneira manual é prejudicial a saúde_\r\n\r\nhttps://comunidadezdg.com.br/ \r\n\r\n⏱️ As inscrições estão *ABERTAS*");
    const foto = MessageMedia.fromFilePath('./foto.jpeg');
    client.sendMessage(msg.from, foto)
    delay(3000).then(async function() {
      try{
        const media = MessageMedia.fromFilePath('./comunidade.ogg');
        client.sendMessage(msg.from, media, {sendAudioAsVoice: true})
        //msg.reply(media, {sendAudioAsVoice: true});
      } catch(e){
        console.log('audio off')
      }
		});
    delay(8000).then(async function() {
      const saudacaoes = ['Olá ' + nomeContato + ', tudo bem?', 'Oi ' + nomeContato + ', como vai você?', 'Opa ' + nomeContato + ', tudo certo?'];
      const saudacao = saudacaoes[Math.floor(Math.random() * saudacaoes.length)];
      msg.reply(saudacao + " Esse é um atendimento automático, e não é monitorado por um humano. Caso queira falar com um atendente, escolha a opção 4. \r\n\r\nEscolha uma das opções abaixo para iniciarmos a nossa conversa: \r\n\r\n*[ 1 ]* - Quero garantir minha vaga na Comunidade ZDG. \r\n*[ 2 ]* - O que vou receber entrando para a turma da ZDG? \r\n*[ 3 ]*- Quais tecnologias e ferramentas eu vou aprender na comunidade ZDG? \r\n*[ 4 ]- Gostaria de falar com o Pedrinho, mas obrigado por tentar me ajudar.* \r\n*[ 5 ]*- Quero aprender como montar minha API de GRAÇA.\r\n*[ 6 ]*- Quero conhecer todo o conteúdo programático da Comunidade ZDG.\r\n*[ 7 ]*- Gostaria de conhecer alguns estudos de caso.  \r\n*[ 8 ]*- In *ENGLISH* please! \r\n*[ 16 ]*- En *ESPAÑOL* por favor.");
		});
    
	}
});

console.log("\nApp incríveis.")
console.log("\nIncreva-se agora acessando link: comunidadezdg.com.br\n")
    
// server.listen(port, function() {
//         console.log('Aplicação rodando na porta *: ' + port + ' . Acesse no link: http://localhost:' + port);
// });
