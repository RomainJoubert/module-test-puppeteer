const timeout = 15000

// série de tests sur la page d'accueil
describe("Tests basiques", () => {

    // parcours client pour se loguer
    test('create_user', async () => {
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#navbar li a')
        // click sur le lien "Sign In" de la navigation
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#navbar li a' ) )
                .filter( el => el.textContent === 'Sign Up' )[0].click();
        });
        // on attent que l'élément ".dropdown-menu" soit chargé
        await page.waitForSelector('.container')
        // on récupère le code HTML
        const html = await page.$eval('.container', e => e.innerHTML)
        // on vérifie qu'il contient la bonne chaîne de caractères et le formulaire
        expect(html).toContain("Register" , 'form')
        // on attent que l'élément soit chargé
        await page.waitForSelector('form')
        await page.type('form[action="/signup"] input[name="username"]',"Romain")
        // on insère le mot de passe dans le champ Password
        await page.type('form[action="/signup"] input[name="password"]',"campus")
        await page.type('form[action="/signup"] input[name="email"]',"email@campus.fr")
        // on clique sur le bouton Sign IN
        await page.$eval( '.btn-default', el => el.click() );
        // on fait une capture d'écran pour vérifier que le formulaire est bien rempli
        await page.screenshot({path: './tests/img/signup_form_create.png'});
        //se connecter en tant qu'admin pour supprimer l'utilisateur
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#navbar li a')
        // click sur le lien "Sign In" de la navigation
        await page.$eval( '.dropdown-toggle', el => el.click() );
        // on attent que l'élément ".dropdown-toggle" soit chargé
        await page.waitForSelector('.dropdown-toggle')
        //insère le nom de l'utilisateur
        await page.type('form[action="login"] input[name="username"]', "admin");
        await page.type('form[action="login"] input[name="password"]', "campus");
        await page.$eval('.btn-success', el => el.click());
        await page.screenshot({path: './tests/img/admin.png'});
        await page.goto('http://polr.campus-grenoble.fr/admin#admin')
        //on tape un texte dans la barre de recherche avec un delai de réponse
        await page.type('#admin_users_table_filter input[type = "search"]', "Romain", {delay:50})
        const btndelete = await page.$eval('#admin_users_table tr td a.btn-danger', e => e.innerHTML)
        // on vérifie qu'il contient la bonne chaîne de caractères
        expect(btndelete).toContain("Delete")
        //on clique sur le bouton
        await page.$eval('#admin_users_table tr td a.btn-danger', el => el.click());    }, timeout)
    // cette fonction est lancée avant chaque test de cette
    // série de tests


    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage();
        //par défaut cliquer ok sur pop-up du navigateur
        page.on('dialog',async dialog => {
            await dialog.accept();
        });
    }, timeout)
})