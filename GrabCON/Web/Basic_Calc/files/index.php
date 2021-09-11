<h2>Welcome to da Basic Calc</h2>
<form action="/" method="POST">
    Enter da equation : <br>
    <input type="text" name="eq"><br>
</form>

<?php

if (isset($_POST["eq"])){
    
    $eq = $_POST["eq"];

    if(preg_match("/[A-Za-z`]+/",$eq)){
        die("BAD.");
    }
    echo "Result: ";
    eval("echo " . $eq . " ;");
}else{
  echo highlight_file('index.php',true);  
}

?>
