<?php 
    $pageName = "Registration";
    include "part_head.php";
    include "part_header.php";
?>

<main>
    <div class="formContainer">
        <div class="message">
            <p>Enter your information to register<br>
                <?php print $_GET["msg"] ?>
            </p>
        </div>
        
        <!-- registration input form table -->
        <form action="validation.php" method="post" name="register" id="registerForm">
            <label for="f_fname">Firstname: </label>
            <input type="text" name="f_fname" id="f_fname" required>
            <br>
            <label for="f_lname">Lastname: </label>
            <input type="text" name="f_lname" id="f_lname" required>
            <br>
            <label for="f_username">Username: </label>
            <input type="text" name="f_username" id="f_username" required>
            <br>
            <label for="f_password">Password: </label>
            <input type="password" name="f_password" id="f_password" required>
            <br>
            <label for="f_password2">Reenter your Password: </label>
            <input type="password" name="f_password2" id="f_password2" required>
            <br>
            <span id="confirmMessage" class="confirmMessage"></span>
            <br>
            <label for="f_email">Email: </label>
            <input type="email" name="f_email" id="f_email" required>
            <br>
        
            <input type="submit" class="button" value="Register">
            <input type="reset" class="button" value="Clear">
        </form>
    </div>
</main>

<?php include "part_footer.php" ?>