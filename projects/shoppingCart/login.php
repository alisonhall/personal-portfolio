<?php 
    $pageName = "Log In";
    include "part_head.php";
    include "part_header.php";
?>

<main>
    <div class="formContainer">
        <div class="message">
            <p>Enter your username and password<br>
                <?php print $_GET["msg"] ?>
            </p>
        </div>
        
        <!-- Log in form -->
        <form action="loginCheck.php" method="post" name="register" id="loginForm">
            <label for="f_username">Username: </label>
            <input type="text" name="f_username" id="f_username" required>
            <br>
            <label for="f_password">Password: </label>
            <input type="password" name="f_password" id="f_password" required>
            <br>
            <input type="submit" value="Log In" class="button">
        </form>
        
        <div class="otherOptions">
            <p>Don't have an account yet? <a href="registration.php">Register Now!</a></p>
        </div>
    </div>
</main>

<?php include "part_footer.php" ?>
