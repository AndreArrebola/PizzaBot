const btnSend = document.getElementById("btn");
const chat = document.getElementById("chat");

var state = "bemvindo";
var sabortemp;
var tamanhotemp;
var pagtemp;

function checkstr(string, array){
    for(i=0;i<array.length;i++){
        if(string.indexOf(array[i])!=-1){
            return true;
        }
    }
    return false;
}
function checkstrindex(string, array){
    for(i=0;i<array.length;i++){
        if(string.indexOf(array[i])!=-1){
            return i;
        }
    }
    return -1;
}
function sendmessage(msg){
    const chatBody = document.querySelector(".scroller");
    const divUser = document.createElement("div");
    divUser.className = "me visible";
    divUser.textContent = chat.value;
    chatBody.append(divUser);
    divUser.scrollIntoView();

}
function respondmessage(msg){
    const chatBody = document.querySelector(".scroller");
    const divCpu = document.createElement("div");
    divCpu.className = "bot visible";
    divCpu.innerHTML = processmessage(msg);
    setTimeout(() => {  
    chatBody.append(divCpu);
    divCpu.scrollIntoView();
    }, 600);
}
function processmessage(msg){
    const saudacoes = ['oi', 'oie', 'ola', 'olá', 'bom dia', 'boa tarde', 'boa noite'];
    const pedido = ['fazer um pedido', 'pedir'];
    if(state=="bemvindo"){
        if(saudacoes.includes(msg)){
            return 'Olá, seja bem vindo à Pizzaria Bons do Pedaço! 🍕'
        }else if(checkstr(msg, pedido)){
            state="sabor";
            return 'Agradecemos a preferência! Qual sabor gostaria?'
        }
    }
    else if(state=="sabor"){
        
        sabortemp=msg;
        state="tamanho";
        return 'Você pediu uma pizza de ' + sabortemp + '. Qual tamanho gostaria, Broto, Média, Grande ou Gigante?'
    }
    else if(state=="tamanho"){
        const tamanhos=['broto', 'média', 'grande', 'gigante'];
        var indextam = checkstrindex(msg, tamanhos);
        
        if(indextam>=0){
            tamanhotemp=tamanhos[indextam];
            state="confirmar"
            
            return 'Você pediu uma pizza de ' + sabortemp + ', tamanho ' + tamanhotemp + '. Posso confirmar?'
        }else{
            return 'Desculpe, não temos este tamanho. Temos pizzas de tamanho Broto, Média, Grande ou Gigante.'
        }
        
        
    }
    else if(state=="confirmar"){
        if(msg=='sim'){
            state="confirmaped";
            return 'Pedido Confirmado! 😃 Sua conta no momento: <br> (lista)<br>Deseja adicionar mais pizzas ao seu pedido?'
        }else if(msg=='nao'){
            state="sabor";
            return 'Certo, vamos tentar novamente. Qual sabor deseja?'
        }
    }
    else if(state=="confirmaped"){
        if(msg=='sim'){
            state="sabor";
            return 'Certo, qual sabor gostaria agora?'
        }else if(msg=='nao'){
            state="confirmacon";
            return 'Deseja fechar a conta? Pizzas pedidas até o momento: <br> (lista)'
        }
    }
    else if(state=="confirmacon"){
        if(msg=='sim'){
            state="perguntacep";
            return 'Conta fechada! 😃 Vamos preparar a entrega agora. Qual seu CEP?'
        }else if(msg=='nao'){
            state="sabor";
            return 'Vamos continuar então. Qual sabor deseja agora?'
            
        }
    }
    else if(state=="perguntacep"){
        state='perguntanum';
        return 'Qual seu número de residência?'
        
    }
    else if(state=="perguntanum"){
        state='confirmaend';
        return 'Você mora no endereço (end)?'
        
    }
    else if(state=="confirmaend"){
        if(msg=='sim'){
            state="formapag";
            return 'Antes de enviarmos, qual forma de pagamento deseja? No momento aceitamos pagamento em débito, crédito, dinheiro e cheque.'
        }else if(msg=='nao'){
            state="perguntacep";
            return 'Sem problemas! Vamos tentar novamente. Qual seu CEP?'
            
        }
    }
    else if(state=="formapag"){
        const pagamento=['débito', 'crédito', 'dinheiro', 'cheque'];
        var indextam = checkstrindex(msg, pagamento);
        
        if(indextam>=0){
            pagtemp=pagamento[indextam];
            state="confirmfinal"
            
            return 'Conta final <br> Pizzas pedidas: <br> Preço total: <br> Endereço de entrega: <br> Forma de Pagamento: <br><br>Podemos fechar?'
        }else{
            return 'Forma de pagamento inválida. Aceitamos somente pagamento em débito, crédito, dinheiro e cheque.'
        }
    }
    else if(state=="confirmfinal"){
        if(msg=='sim'){
            state="bemvindo";
            return 'Conta fechada. Faremos as pizzas e enviaremos um motoboy assim que possível! A estimativa de tempo é 30 minutos. <br> A Pizzaria Bons do Pedaço agradece sua preferência!'
        }else if(msg=='nao'){
            state="corrigir";
            return 'Então, o que deseja fazer? Pedir mais uma pizza, corrigir endereço ou alterar a forma de pagamento?'
            
        }
    }
    else if(state=="corrigir"){
        const correcoes=['pedir', 'pedido', 'endereço', 'cep', 'numero', 'pagamento', 'pagar', 'fechar'];
        var indexcor = checkstrindex(msg, correcoes);
        if (indexcor==0||indexcor==1){
            state="sabor";
            return 'Vamos voltar a pedir pizzas então! Me avise se desejar fechar a conta.'
        }else if (indexcor==2||indexcor==3||indexcor==4){
            state="perguntacep";
            return 'Vamos corrigir seu endereço! Comece informando seu CEP.'
        }
    else if (indexcor==5||indexcor==6){
        state="formapag";
        return 'Qual pagamento deseja? Estamos aceitando pagamento em débito, crédito, dinheiro e cheque.'
    }
    else if (indexcor==7){
        state="confirmfinal"
            
        return 'Conta final <br> Pizzas pedidas: <br> Preço total: <br> Endereço de entrega: <br> Forma de Pagamento: <br><br>Podemos fechar?'
    }
    }
    
    return 'Desculpe, não entendi.'
}

btnSend.addEventListener("click", (e) => {
    e.preventDefault();
    if (chat.value == "") {} else {
        //getMessage(chat.value);
        sendmessage(chat.value);
        
        
        respondmessage(chat.value.toLowerCase());
        
        chat.value = "";
    }
});