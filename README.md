# Todo App Dokumentáció
## Áttekintés
A Todo App egy teendőket kezelő webalkalmazás, aminek segítségével egy webes felületen kezelhetjük különböző feladatainkat. Van lehetőségünk újat felvenni, meglévőt törölni, valamint a prioritásukat és státuszukat módosítani. Minden teendő rendelkezik címmel, határidővel, státusszal és leírással. A felhasználói felület megjelenítése és kezelése React keretrendszer használatával történik, mely REST interfészen keresztül kommunikál a háttérrendszerrel, ami ASP.NET Core Web Api-n keresztül fogadja a kéréseket, majd Entity Framework segítségével lokális adatbázisban tárolja el az adatokat.
## Felépítés
### Frontend
A felhasználói felület React használatával készült, a kinézeti stílushoz pedig a React Bootstrap könyvtár adja az elemeket. Az alkalmazás 4 fő komponensre bontható.
#### App
Az App komponensben a legmagasabb szintű elem. Itt kezeljük a teendőket tároló tömböt a *useState hook* használatával, amit adunk tovább a kisebb egységek kezelésére szolgáló komponenseknek. A felület betöltésekor a *useEffect hook* segítségével betöltjük az adatbázisból a meglévő teendőket (Http GET request-re adott Api válasz alapján), majd megjeleníti a felületen az új Todo felvételére szolgáló formot *(TodoForm)*, és négy oszlopot a teendők négy állapotának megjelenítésére *(TodoList)*.
#### TodoForm
Ez a komponens felelős az új elem létrehozásának kezeléséért. Megadhatjuk az új teendő címét, határidejét, állapotát és leírását. A címet és határidőt kötelező kitölteni, anélkül nem hozható létre. Az *Add Todo* gomb megnyomásakor keletkezik egy új todo, ami bekerül a teendőket tároló tömbbe, Http POST kérés küldésével elküldjük a háttéralkalmazásnak, majd megjelenítődik a megfelelő oszlopban.
#### TodoList
A TodoList segítségével jelenítjük meg a teendőket a státuszuk szerinti oszlopban. A todo-kat tároló tömbből kiválogatja az adott státuszhoz tartozó elemeket, majd mindegyik elemet egyesével továbbadva létrehoz egy *Todo* példányt.
#### Todo
A Todo komponens felel a teendők megjelenítéséért és kezeléséért. Megjeleníti a teendő nevét, határidejét, státuszát, leírását és a kezelésére szolgáló gombokat. A fel, vagy le gombok segítségével mozgathatjuk függőlegesen az elemeket az oszlopban, így módosíthatjuk a prioritásukat. Mozgatás esetén kicseréljük az elmozgatott elemek indexét, és ezt a változást Http PUT kéréssel jelezzük az Api felé. A státusz módosításáért felelős legördülő gomb állításakor megváltoztatjuk az adott Todo státuszát az új státuszra, majd szintén PUT kéréssel küldjük a módosítást. A törlés gomb megnyomásakor kitöröljük az adott elemet a teendők közül, és Http DELETE request-et küldünk az Api-nak.
### Backend
A kéréseket kiszolgáló Web Api ASP.NET Core segítségével készült, ami az adatbázissal Entity Framwork-on keresztül kommunikál. Adatbázisként Microsoft SQL Server Express LocalDB-t hozunk létre, egyszerű, relációs adatbázisnak.
#### Todo és TodoContext
A Todo osztály adja meg a teendőket ábrázoló modellt. Rendelkezik Id attribútummal, melyet az alkalmazás generál autómatikusan, valamint címmel, határidővel, leírással, státusszal és indexel (index és id int értékű, minden más string). A TodoContext hozza létre az adatbázist, melybe egy Todo elemeket tartalmazó tömböt tárol el Entity Framework használatával.
#### TodoController
Ez az osztály felelős a Http kérések fogadásáért és kiszolgálásáért. Konstruktorában kap egy TodoContext-et, melyen keresztül tudja írni és kiolvasni az adatokat az adatbázisból. Http GET kérés hatására elküldi az összes teendőt, ha pedig id attribútummal érkezik a kérés, az adott id-val rendelkező todo-t adja vissza. PUT kérésre lecseréli az adott azonosítójú teendőt az újonnan kapottra, POST kérésre hozzáadja az adatbázishoz az érkező elemet, és DELETE kérésre kitörli az adott id-val rendelkező todo-t.
#### Tesztek
A TodoController tesztelését végző tesztek kiszolgálásához létrehozunk egy új TodoContext-et, ami SQLite adatbázist használ az egyszerű teszteléshez. Ellenőrizzük, hogy a controller összes funkciója megfelelő eredményt szolgáltat-e a tesztadatbázis tesztadatainak segítségével.
## Beüzemelés
## Használat
