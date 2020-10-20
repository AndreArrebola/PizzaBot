<?php
include "Bot.php";
$bot = new Bot;

include "Cep.php";
include "Cotacao.php";

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
    "php" => "É uma linguagem de programação server side.",
    "linux" => "É um sistema operacional criado por Linus Torvald.",
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
        if (checkstr($msg, $pedido)!== false){

            $botty->reply('Vamos fazer um pedido então.');
            
        }
        elseif (in_array($msg, $generics)) {
            $botty->reply('Olá. Em que posso ajudar?');
        } elseif ($botty->ask($msg, $questions) == "") {
            $botty->reply("Desculpe, não entendi.");
        } else {
            $botty->reply($botty->ask($msg, $questions));
        }
    });
}
