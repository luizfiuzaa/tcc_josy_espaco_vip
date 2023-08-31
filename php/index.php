<?php
    declare(strict_types=1);

    header("Access-Control-Allow-Origin: *");
    // permite que seja acessado por todos as outras redes
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    // permite quem tem acesso, a execução dos comandos acima
    header("Access-Control-Allow-Headers: Content-Type");
    // permite controle aos headers de dados no php e no angular

    // sleep(2);
    echo json_encode(
        [
            [
                'nome' => 'Aristeu',
                'email' => 'Aristeu@gmail.com',
                'tel' => '15 999999999'
            ],
            [
                'nome' => 'Billy',
                'email' => 'Billy@gmail.com',
                'tel' => '15 999999999'
            ],
            [
                'nome' => 'Clebiano',
                'email' => 'Clebiano@gmail.com',
                'tel' => '15 999999999'
            ],
            [
                'nome' => 'Dênis',
                'email' => 'Dênis@gmail.com',
                'tel' => '15 999999999'
            ],
            [
                'nome' => 'Ednaldo',
                'email' => 'Ednaldo@gmail.com',
                'tel' => '15 999999999'
            ],
            [
                'nome' => 'Flaviana',
                'email' => 'Flaviana@gmail.com',
                'tel' => '15 999999999'
            ],
            [
                'nome' => 'Gerdônia',
                'email' => 'Gerdônia@gmail.com',
                'tel' => '15 999999999'
            ],
            [
                'nome' => 'Heitor',
                'email' => 'Heitor@gmail.com',
                'tel' => '15 999999999'
            ],
            [
                'nome' => 'Ivanny',
                'email' => 'Ivanny@gmail.com',
                'tel' => '15 999999999'
            ]
            ]
);
?>