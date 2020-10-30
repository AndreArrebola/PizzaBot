<?php
session_start();


include "Bot.php";
$bot = new Bot;

include "Cep.php";
global $estado;
$estadoslista=['bemvindo', 'sabor', 'tamanho', 'listarpedido', 'confirmapedido', 'pagamento', 'endereco', 'final'];

function checkstr($string, $array){
    $found = false;
    foreach($array as $cont){
        if (strpos($string, $cont)!== false){
            $found = true;
        }
    }
    return $found;
}

$questions = [
    "pizza" => "Hora da pizza!",
    "qual o seu nome" => "Meu nome é " . $bot->getName()
];



# recebe uma mensagem enviada pelo usuário
if (isset($_GET['msg'])) {
    $msg = strtolower($_GET['msg']);
    $bot->hears($msg, function (Bot $botty) {
        global $msg;
        global $questions;
        

        $generics = ['oi', 'oie', 'ola', 'olá', 'bom dia', 'boa tarde', 'boa noite'];
        $pedido = ['fazer um pedido', 'pedir'];
        if($_SESSION['estado']=="bemvindo"){

        
        if (checkstr($msg, $pedido)!== false){

            $botty->reply('Agradecemos a preferência, vamos começar seu pedido.<br>');
            $_SESSION['estado'] = "sabor";
            $botty->reply('Qual sabor gostaria?');
            $botty->reply($_SESSION['estado']);
            
        }
        elseif (in_array($msg, $generics)) {
            $botty->reply('Olá, seja bem vindo à Pizzaria Bons do Pedaço. ');
        } elseif ($botty->ask($msg, $questions) == "") {
            $botty->reply("Desculpe, não entendi.");
            $botty->reply($_SESSION['estado']);
        } else {
            $botty->reply($botty->ask($msg, $questions));
        }
    }elseif($_SESSION['estado']=="sabor"){
        $botty->reply('Você pediu uma pizza de ' . $msg.'. Qual tamanho gostaria?');
        $_SESSION['estado'] = "tamanho";
        $botty->reply($_SESSION['estado']);

    }elseif($_SESSION['estado']=="tamanho"){
        $botty->reply('Você pediu uma pizza tamanho ' . $msg.'.');
        
        $botty->reply($_SESSION['estado']);
    }});
}
