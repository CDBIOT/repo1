const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const qrcode = require ('qrcode-terminal');
const  { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const socketIO = require('socket.io');

const port = process.env.PORT || 3000 || 8000;
const io = socketIO(server);


app.use("/", express.static(__dirname + "/pages/socketio.html"))

app.get('/', (req, res) => {
  res.sendFile('/pages/socketio.html', {
    root: __dirname
  });
});
  
const client = new Client({
 // restartOnAuthFail: true,
 authStrategy: new LocalAuth(),
 webVersion: '2.2412.50',

 // authStrategy: new LocalAuth({ clientId: 'cdbot' }),
  puppeteer: { headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      //'--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ] }
});


io.on('connection', function(socket) {
  socket.emit('message', '© BOT-CDB - Iniciado');
  socket.emit('qr', './icon.svg');

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
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
    console.log('© BOT-CDB Dispositivo pronto');
});

client.on('authenticated', () => {
    socket.emit('authenticated', '© BOT-CDB Autenticado!');
    socket.emit('message', '© BOT-CDB Autenticado!');
    console.log('© BOT-CDB Autenticado');
});

client.on('auth_failure', function() {
    socket.emit('message', '© BOT-CDB Falha na autenticação, reiniciando...');
    console.error('© BOT-CDB Falha na autenticação');
});

client.on('change_state', state => {
  console.log('© BOT-CDB Status de conexão: ', state );
});

// client.on('disconnected', (reason) => {
//   socket.emit('message', '© BOT-ZDG Cliente desconectado!');
//   console.log('© BOT-CDB Cliente desconectado', reason);
  //client.initialize();
// });
});


client.on('message_create', message => {
	console.log(message.body);
});

client.on('message_create', message => {
	if (message.body === 'Ping') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'Pong');
	}
});
client.on('message_create', message => {
	if (message.body === 'ping') {
		// reply back "pong" directly to the message
		message.reply('pong!');
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
    msg.reply("Na *Comunidade ZDG* você vai integrar APIs, automações com chatbots e sistemas de atendimento multiusuário para whatsapp. Com *scripts para copiar e colar e suporte todos os dias no grupo de alunos*.\n\nhttps://comunidadezdg.com.br/ \n\n*⏱️ As inscrições estão ABERTAS*\n\nAssista o vídeo abaixo e entenda porque tanta gente comum está economizando tempo e ganhando dinheiro explorando a API do WPP, mesmo sem saber nada de programação.\n\n📺 https://www.youtube.com/watch?v=AoRhC_X6p5w")
  } 
  
  else if (msg.body !== null && msg.body === "2") {
    msg.reply("*" + nomeContato + "*, na Comunidade ZDG, você vai:\n\n- Utilizar códigos já testados para automatizar seu atendimento com chatbots no whatsapp\n- Criar e aplicativos para gestão de CRM e plataformas multiusuários para chats de atendimento\n- Aprender integrações com ferramentas e APIs que já foram testadas e aprovadas pela comunidade\n- Curadoria de plugins e ferramentas gratuitas para impulsionar o marketing de conversa no seu negócio\n- Se conectar a mais de 2.000 alunos que também estão estudando e implementando soluções de marketing de conversa\n- Grupo de alunos organizado por tópicos\n- Ter acesso ao meu suporte pessoal todos os dias");
  }
  
  else if (msg.body !== null && msg.body === "3") {
    msg.reply("*" + nomeContato + "*, " + "essas são as principais APIs que a ZDG vai te ensinar a usar com o WhatsApp:\nBaileys, Venom-BOT, WPPConnect, WPPWeb-JS e Cloud API (Api Oficial)\n\n*Essas são as principais integrações que a ZDG vai te ensinar a fazer com o WhatsApp:*\nBubble, WordPress (WooCommerce e Elementor), Botpress, N8N, DialogFlow, ChatWoot e plataformas como Hotmart, Edduz, Monetizze, Rd Station, Mautic, Google Sheets, Active Campaing, entre outras.");
  }
  
  else if (msg.body !== null && msg.body === "4") {

        const contact = await msg.getContact();
        setTimeout(function() {
            msg.reply(`@${contact.number}` + ' seu contato já foi encaminhado para o Cristiano');  
            client.sendMessage('55111975594528@c.us','Contato CDB. https://wa.me/' + `${contact.number}`);
	    //client.sendMessage('5515998566622@c.us',`${contact.number}`);
          },1000 + Math.floor(Math.random() * 1000));
  
  }
  
  else if (msg.body !== null && msg.body === "4") {
    msg.reply("Seu contato já foi encaminhado para o Cristiano");
  }
  
  else if (msg.body !== null && msg.body === "5") {
    msg.reply("*" + nomeContato + "*, " + "aproveite o conteúdo e aprenda em poucos minutos como colocar sua API de WPP no ar, gratuitamente:\r\n\r\n🎥 https://youtu.be/sF9uJqVfWpg");
  }
  
  else if (msg.body !== null && msg.body === "7") {
    msg.reply("*" + nomeContato + "*, " + ", que ótimo, vou te enviar alguns cases de sucesso:\n\n📺 https://youtu.be/KHGchIAZ5i0\nGustavo: A estratégia mais barata, eficiente e totalmente escalável.\n\n📺 https://youtu.be/S4Cwrnn_Llk\nNatália: Nós aumentamos o nosso faturamento e vendemos pra mais clientes com a estratégia ZDG.\n\n📺 https://youtu.be/XP2ns7TOdIQ\nYuri: A ferramenta me ajudou muito com as automações da minha loja online.\n\n📺 https://youtu.be/KBedG3TcBRw\nFrancisco: O Pedrinho pega na nossa mão. Se eu consegui, você também consegue.\n\n📺 https://youtu.be/L7dEoEwqv-0\nBruno: A Comunidade ZDG e o suporte do Pedrinho são incríveis. Depois que eu adquiri o curso eu deixei de gastar R$300,00 todo mês com outras automações.\n\n📺 https://youtu.be/StRiSLS5ckg\nRodrigo: Eu sou desenvolvedor de sistemas, e venho utilizando as soluções do Pedrinho para integrar nos meus sistemas, e o ganho de tempo é excepcional.\n\n📺 https://youtu.be/sAJUDsUHZOw\nDarley: A Comunidade ZDG democratizou o uso das APIs do WPP.\n\n📺 https://youtu.be/S4Cwrnn_Llk\nNatália: Nós aumentamos o nosso faturamento e vendemos pra mais clientes com a estratégia ZDG.\n\n📺 https://youtu.be/crO8iS4R-UU \nndré: O Pedrinho compartilha muitas informações na Comunidade ZDG.\n\n📺 https://youtu.be/LDHFX32AuN0\nEdson: O retorno que tenho no meu trabalho com as informações do Pedrinho, fez o meu investimento sair de graça.\n\n📺 https://youtu.be/F3YahjtE7q8\nDaniel: Conteúdo de muita qualidade. Obrigado, professor Pedrinho.\n\n📺 https://youtu.be/YtRpGgZKjWI\nMarcelo: Tenho uma agência digital e com o curso do Pedrinho nós criamos um novo produto e já estamos vendendor.\n\n📺 https://youtu.be/0DlOJCg_Eso\nKleber: O Pedrinho tem uma didática excelente e com o curso dele, consegui colocar minha API para rodar 24 horas e estou fazendo vendas todos os dias.\n\n📺 https://youtu.be/rsbUJrPqJeA\nMárcio: Antes de adquirir eu tinha pouco conhecimento, mas consegui aprender muito sobre API com o Pedrinho e o pessoal da comunidade.\n\n📺 https://youtu.be/YvlNd-dM9oo\nZé: O Pedrinho tem um conteúdo libertador. Foi o melhor investimento que eu fiz. Conteúdo surreal.\n\n📺 https://www.youtube.com/watch?v=mHqEQp94CiE\nLéo: Acoplamos o Método ZDG aos nossos lançamento e otimizamos os nossos resultados.\n\n📺 https://youtu.be/pu6PpNRJyoM\nRenato: A ZDG é um método que vai permitir você aumentar o seu faturamento em pelo menos 30%.\n\n📺 https://www.youtube.com/watch?v=08wzrPorZcI\nGabi: Implementei a estratégia sem saber nada de programação\n\n📺 https://youtu.be/10cR-c5rOKE\nDouglas: Depois de implementar as soluções do Pedrinho eu tive um aumento de 30% no meu faturamento, sem contar que na comunidade ZDG todos se ajudam.\n\n📺 https://youtu.be/kFPhpl5uyyU\nDanielle: Sem sombra de dúvida ter conhecido o Pedrinho e o seu conteúdo foi a melhor coisa que aconteceu comigo.\n\n📺 https://youtu.be/3TCPRstg5M0\nCalebe: O sistema Zap das Galáxias foi fundamental na elaboração e na execução das estratégias do meu negócio.\n\n📺 https://youtu.be/XfA8VZck5S0\nArtur: As soluções da comunidade me ajudaram muito a aumentar as minhas vendas e a interagir com os meus clientes de maneira automática. O suporte é incrível.\n\n📺 https://youtu.be/4M-P3gn9iqU\nSamuel: A Comunidade ZDG tem muito conteúdo legal, que da pra você utilizar no seu dia a dia pra meios profissionais. Depois que aprendi o método, nunca mais tive bloqueios.");
  }

});

// Start your client
client.initialize();

// server.listen(port, () => {
//   console.log('server running at port: '+ port );
// });
  