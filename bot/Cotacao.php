<?php

class Cotacao
{
    private $data = array();

    
    public function __construct($moeda)
    {
        
        $url = "https://economia.awesomeapi.com.br/" . $moeda;
        
        $obj = json_decode(file_get_contents($url), True);

        $this->data = $obj;
    }

    # retorna os dados recuperados
    public function getChange()
    {
        return $this->data;
    }


    
}
