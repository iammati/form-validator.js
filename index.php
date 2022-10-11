<?php

$development = (
    trim(file_get_contents('/var/www/html/dist/hot'))
) === 'development';

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@iammati/form-validator.js</title>

    <?php if ($development) echo <<<HTML
        <script type="module" src="https://test.ddev.site:3000/dist/@vite/client"></script>
    HTML; ?>
</head>

<body>
    <form action="form.php" method="post" data-smedia-validate="1">
        <input type="email" name="email" placeholder="Email*" required>
        <input type="text" name="firstname" placeholder="Firstname*" required>
        <input type="text" name="lastname" placeholder="Lastname*" required>
        <input type="tel" name="telephone" placeholder="Telephone*" required>

        <fieldset>
            <legend>Choose your monster's features:</legend>

            <div>
                <input type="checkbox" id="scales" name="scales" checked>
                <label for="scales">Scales</label>
            </div>

            <div>
                <input type="checkbox" id="horns" name="horns">
                <label for="horns">Horns</label>
            </div>
        </fieldset>


        <fieldset>
            <legend>Select a maintenance drone:</legend>

            <div>
                <input type="radio" id="huey" name="drone" value="huey" checked>
                <label for="huey">Huey</label>
            </div>

            <div>
                <input type="radio" id="dewey" name="drone" value="dewey" required>
                <label for="dewey">Dewey</label>
            </div>

            <div>
                <input type="radio" id="louie" name="drone" value="louie">
                <label for="louie">Louie</label>
            </div>
        </fieldset>


        <select name="gender" required>
            <option value="" selected disabled>Gender</option>
            <option value="male">SIGMA</option>
            <option value="female">alpha</option>
            <option value="idk">gamma</option>
        </select>

        <input type="submit" value="Submit">
    </form>


    <?php if ($development) echo <<<HTML
        <script type="module" src="https://test.ddev.site:3000/src/JavaScript/iife.js"></script>
    HTML; else echo <<<HTML
        <script type="module" src="/dist/iife.js"></script>
    HTML; ?>
</body>

</html>