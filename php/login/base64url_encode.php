<?php
  function base64url_encode ($data) {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
  }
?>