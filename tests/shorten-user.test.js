const timeout = 15000

// test d'un raccourcisseur d'URL
describe("Shorten User", () => {
    let page
    // vérification du chargement de la page d'accueil
    test('shorten user', async () => {
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#navbar li a')
        await page.screenshot({path: './tests/img/sergio.png'});
            // click sur le lien "Sign In" de la navigation
        await page.$eval( '.dropdown-toggle', el => el.click() );
            // on attend que l'élément soit chargé
        await page.waitForSelector('.dropdown-toggle')
        await page.type('form[action="login"] input[name="username"]',"romainj")
            // on insère le mot de passe dans le champ Password
        await page.type('form[action="login"] input[name="password"]',"romainj")
            // on clique sur le bouton Sign IN
        await page.$eval( '.btn-success', el => el.click() );
        await page.waitForSelector('.long-link-input')
        await page.type('.long-link-input', 'https://stackoverflow.com/questions/45864516/how-to-select-an-option-from-dropdown-select/47435873#47435873');
        await page.screenshot({path: './tests/img/long-url.png'});
        await page.waitForSelector('#shorten');
        await page.$eval( '#shorten', el => el.click() );
        await page.waitForSelector('#short_url')
        const val = await page.$eval('#short_url', el => el.value)
        expect(val).toMatch(/^http:\/\/polr\.campus\-grenoble\.fr\/[0-9a-zA-Z]+/)
        await page.screenshot({path: './tests/img/shorten-url.png'});
        // click sur le lien "Nom Utilisateur" de la navigation
        await page.$eval( '.dropdown-toggle', el => el.click() );
        // on attend que l'élément soit chargé
        await page.waitForSelector('.dropdown-menu')
        const exit = await page.$eval('.dropdown-menu', e => e.innerHTML)
        // on vérifie qu'il contient la bonne chaîne de caractères
        expect(exit).toContain("Logout")
        await page.$eval( 'ul.dropdown-menu li:last-child a', el => el.click() );
        // await page.goto('http://polr.campus-grenoble.fr/')
        await page.screenshot({path: './tests/img/logout.png'});
    }, timeout)



    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
