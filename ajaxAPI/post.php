<?php

if (isset($_POST['name'])) {
    echo '{"name": "' . $_POST["name"] . '"}';
} else {
    echo '{"name": "erreur"}';
}
