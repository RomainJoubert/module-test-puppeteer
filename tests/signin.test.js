const timeout = 15000

// série de tests sur la page d'accueil
describe("Test pour se loguer", () => {
    let page

    // parcours client avec signIn
    test('home and signin', async () => {
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#navbar li a')
        // click sur le lien "Sign In" de la navigation
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#navbar li a' ) )
                .filter( el => el.textContent === 'Sign In' )[0].click();
        });
        // on attend que l'élément ".dropdown-menu" soit chargé
        await page.waitForSelector('.dropdown-menu')
        // on récupère le code HTML
        const html = await page.$eval('.dropdown-menu', e => e.innerHTML)
        // on vérifie qu'il contient la bonne chaîne de caractères et le formulaire
        expect(html).toContain("Login" , 'form')
    // }, timeout)
    //
    // // parcours client pour se loguer
    // test('login', async () => {
    //     await page.goto('http://polr.campus-grenoble.fr')
    //     await page.waitForSelector('#navbar li a')
        await page.waitForSelector('.dropdown-toggle')
        // click sur le lien "Sign In" de la navigation
        await page.$eval( '.dropdown-toggle', el => el.click() );
        // on attend que l'élément soit chargé
        await page.waitForSelector('.dropdown-toggle')
        await page.type('form[action="login"] input[name="username"]',"admin")
        await page.screenshot({path: './tests/img/signin_username.png'});
        // on insère le mot de passe dans le champ Password
        await page.type('form[action="login"] input[name="password"]',"campus")
        await page.screenshot({path: './tests/img/signin_password.png'});
        // on clique sur le bouton Sign IN
        await page.$eval( '.btn-success', el => el.click() );
        // on fait une capture d'écran pour vérifier que le formulaire est bien rempli
        await page.screenshot({path: './tests/img/signin_form.png'});

    }, timeout)


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
