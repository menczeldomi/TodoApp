# Todo App Dokumentáció
## Áttekintés
A **Todo App** egy teendőket kezelő webalkalmazás, aminek segítségével egy webes felületen kezelhetjük különböző feladatainkat. Van lehetőségünk újat felvenni, meglévőt törölni, valamint a prioritásukat és státuszukat módosítani. Minden teendő rendelkezik címmel, határidővel, státusszal és leírással. A felhasználói felület megjelenítése és kezelése `React` keretrendszer használatával történik, amely `REST` interfészen keresztül kommunikál a háttérrendszerrel, ami `ASP.NET Core Web API`-n keresztül fogadja a kéréseket, majd `Entity Framework` segítségével lokális adatbázisban tárolja el az adatokat.
## Felépítés
### Frontend
A felhasználói felület `React` használatával készült, a kinézeti stílushoz pedig a `React Bootstrap` könyvtár adja az elemeket. Az alkalmazás négy fő komponensre bontható.
#### App
Az `App` komponens a legmagasabb szintű elem. Itt kezeljük a teendőket tároló tömböt, amit továbbadunk a kisebb egységek kezelésére szolgáló komponenseknek. Az alkalmazás indulásakor betölti az adatbázisból a meglévő teendőket *(*`Http GET` *request-re adott API válasz alapján)*, majd megjeleníti a felületen az új `Todo` felvételére szolgáló formot `(TodoForm)`, és négy oszlopot a teendők négy állapotának megjelenítésére `(TodoList)`.
#### TodoForm
Ez a komponens felelős az új elem létrehozásának kezeléséért. Megadhatjuk az új teendő címét, határidejét, állapotát és leírását. A címet és határidőt kötelező kitölteni, hiányát jelzi a program. Az *Add Todo* gomb megnyomásakor keletkezik egy új todo, ami bekerül a teendőket tároló tömbbe, `Http POST` kérés küldésével elküldjük a háttéralkalmazásnak, majd megjelenítődik a megfelelő oszlopban.
#### TodoList
A `TodoList` segítségével jelenítjük meg a teendőket a státuszuk szerinti oszlopban. A todo-kat tároló tömbből kiválogatja az adott státuszhoz tartozó elemeket, majd mindegyik elemet egyesével továbbadva létrehoz egy `Todo` példányt.
#### Todo
A `Todo` komponens felel a teendők megjelenítéséért és kezeléséért. Megjeleníti a teendő nevét, határidejét, státuszát, leírását és a kezelésére szolgáló gombokat. A fel, vagy le gombok segítségével mozgathatjuk az elemeket az oszlopban, így módosíthatjuk a prioritásukat. Mozgatás esetén kicseréljük az elmozgatott elemek indexét, és ezt a változást `Http PUT` kéréssel jelezzük az API felé. A státusz módosításáért felelős legördülő gomb állításakor megváltoztatjuk az adott todo státuszát az új státuszra, majd szintén `PUT` kéréssel küldjük a módosítást. A törlés gomb megnyomásakor kitöröljük az adott elemet a teendők közül, és `Http DELETE` request-et küldünk az API-nak.
### Backend
A kéréseket kiszolgáló Web API `ASP.NET Core` segítségével készült, ami az adatbázissal `Entity Framwork`-on keresztül kommunikál. Adatbázisként `Microsoft SQL Server LocalDB`-t hozunk létre, egyszerű, relációs adattárolásra.
Használt NuGet csomagok (a projekt létrehozásával alapból telepítetteken kívül):
API-hoz:
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Design
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.EntityFrameworkCore.SqlServer
Teszteléshez:
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Sqlite
#### Todo és TodoContext
A `Todo` osztály adja meg a teendőket ábrázoló modellt. Rendelkezik Id attribútummal, melyet az alkalmazás generál automatikusan, valamint címmel, határidővel, leírással, státusszal és indexel (index és Id *integer* értékű, minden más *string*). A `TodoContext` hozza létre az adatbázist, melybe egy `Todo` elemeket tartalmazó listát tárol el `Entity Framework` segítségével.
#### TodoController
Ez az osztály felelős a `Http` kérések fogadásáért és kiszolgálásáért. Konstruktorban kap egy `TodoContext` példányt, melyen keresztül tudja írni és olvasni az adatokat az adatbázisból. `Http GET` kérés hatására elküldi az összes teendőt, ha pedig Id attribútummal érkezik a kérés, az adott Id-vel rendelkező todo-t adja vissza. `PUT` kérésre lecseréli az adott azonosítójú teendőt az újonnan kapottra, `POST` kérésre hozzáadja az adatbázishoz az érkező elemet, valamint `DELETE` kérésre kitörli az adott Id-vel rendelkező todo-t.
#### Tesztek
A `TodoController` tesztelését végző tesztek kiszolgálásához létrehozunk egy új `TodoContext`-et, ami `SQLite` adatbázist használ az egyszerű teszteléshez. Ellenőrizzük, hogy a controller összes funkciója megfelelő eredményt szolgáltat-e a tesztadatbázis tesztadatainak segítségével.
## Használat
A backend beüzemeléséhez a *TodoApi* mappában található projektet kell megnyitnunk. Ha nincsen még létrehozva adatbázis az eszközön akkor a `Package Manager Console`-ban az alábbi paranccsal hozhatjuk létre:
```
Update-Database
```
A `TodoApi` projekt indításával elérhetővé válnak az API végpontok, és tudják fogadni az érkező kéréseket.

A frontend indításához a *todo-app* mappába navigálva szükséges megnyitnunk egy konzolt, ahol a következő parancs kiadásával indul el a webalkalmazás:
```
npm start
```
A webes felület betöltése után az alábbi oldal fogad minket:
![image](https://user-images.githubusercontent.com/90689246/168683608-1abee539-51db-4b80-9b9d-6cffa981a13f.png)
Az oldal tetején található szekcióban vehetünk fel új teendő elemeket a listánkba. Megadhatjuk a nevét és határidejét (ez a két adat kötelező), a státuszát, mely lehet todo (azaz "függőben"), folyamatban, kész és inaktív, valamint mellékelhetünk opcionálisan egy leírást is. Az *Add Todo* gomb lenyomásával felvesszük az új todo-t az adatbázisba és a megfelelő oszlopban meg is fog jelenni. Minden todo elemnél láthatjuk, hogy rendelkezik négy gombbal. Az *Up* és *Down* gombok segítségével mozgathatjuk fel-le a teendőt, így állíthatjuk prioritását, valamint változtathatjuk állapotát, aminek hatására átkerül a választott állapothoz tartozó oszlopba, és ki is törölhetjük az adott elemet a *Delete* gomb megnyomásával.
