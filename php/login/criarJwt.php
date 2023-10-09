<?php
require '../login/base64url_encode.php';

function criar_jwt ($ID_USER, $TIPO_USER, $LOGIN_USER) {
  $secret = '#Frngoclimao20';
  $header = base64url_encode('{"alg": "HS256", "type": "JWT"}');
  $exp = strtotime('+15 days'); // definir quando o token vai ser mandado de base
  $payload = base64url_encode('{"ID_USER": "'.$ID_USER.'", "TIPO_USER": "'.$TIPO_USER.'", "LOGIN_USER": "'.$LOGIN_USER.'", "exp": "'.$exp.'"}');
  $signature = hash_hmac('sha256', $header.'.'.$payload, $secret);

  return $header.'.'.$payload.'.'.$signature;
}
?>
