# Amplify Workshop

- Ga naar IAM management console op AWS:
  
    https://us-east-1.console.aws.amazon.com/iamv2/home#/users

    en maak een user aan met codingguild-jouwnaam (als die al bestaat, kun je die user gebruiken)

- Open het user scherm voor de user die je zonet hebt aangemaakt.
- Klik op de `Add Permissions` knop, kies `Attach existing policies directly` en selecteer `AdministratorAccess-Amplify`.
- Klik op `Next: Review` en rond het proces af.
- Klik op de `Security credentials` tab. Vervolgens klik je op de `Create Access Key` knop.
- Klik op “download CSV” om de key/secret combo op te slaan.


- Open een terminal venster en clone het coding guild project:
    ```
    git clone git@gitlab.com:trivento/coding-guild-amplify
    ```
- Installeer node modules:
    ```
    npm install
    ```
- Initialiseer amplify:
    ```
    amplify init
    ```
- Accepteer de default settings (deze kunnen later nog gewijzigd worden)
- Kies voor `AWS access keys` als authentication method
- Vul de AccessKeyId en secret in uit het CSV bestand. Kies voor regio `eu-west-1`.


- Na de initialisatie van Amplify voegen we de authenticatie setup toe met:
    ```
    amplify add auth
    ```
- Kies voor `Default configuration`, `Email` en `No, I’m Done`
- Vervolgens voegen we nog een api toe met:
    ```
    amplify add api
    ```
- Kies voor `GraphQL` en selecteer vervolgens met de pijltjes `Authorization mode` en zet deze op `Cognito User Pool`.
- Kies daarna voor `One-to-many relationship (e.g. "Blogs" with "Posts" and "Comments")`
- Kies No om dit proces eerst af te ronden.

Nu hebben we een NextJS app met een Amplify setup en kunnen we een start maken met de applicatie.

We beginnen met het datamodel. Hiervoor openen we de directory in je favoriete editor. 
Open het GraphQL schema: `amplify/backend/api/cgamplify/schema.graphql`.
Je zult zien dat in dit bestand al drie modellen staan voor blog, posts en comments. In dit model heeft 
een Blog meerdere Posts en een Post heeft weer meerdere Comments.

Daarnaast staat bovenaan een regel met `input AMPLIFY { globalAuthRule: AuthRule = { allow: public } }`. 
Haal deze regel weg. Ga vervolgens terug naar de terminal en voer het volgende commando uit:
```bash
amplify push
```

De hele app wordt nu naar AWS Amplify gepusht. Je krijgt dan eerst de vraag of je door wilt gaan, selecteer `Yes`.
Vervolgens zal er gevraagd worden of je code wilt genereren voor je GraphQL API. Selecteer hier `Yes` en beantwoordt
de vragen met 
- `typescript`
- `src/graphql/**/*.ts`
- `Yes`
- `2`
- `src/API.ts`

Het duurt nu enige tijd om de AWS tooling op te zetten. Er zal een Cognito User Pool geconfigureerd worden voor de
authenticatie. Daarna volgt een AWS AppSync en DynamoDB voor de data. Na een paar minuten is alles klaar en is de 
app helemaal klaar voor gebruik.



