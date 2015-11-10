# Alkalmazások fejlesztése első beadandó
## Makettkészlet nyilvántartó alkalmazás

***

###Követelményanalízis

A program regisztrált és hitelesített felhasználók számára nyújt lehetőséget makettkészleteik nyilvántartására.

Funkcionális elvárások:
  + Lehetőség legyen az oldalon a regisztrációra felhasználók számára
  + Lehetőség legyen be és kilépésre regisztrált felhasználóknak
  + Bejelentkezett felhasználók számára listázza az alkalmazás a saját makettkészleteiket
  + Lehetőség legyen új készlet hozzáadására a bejelentkezett felhasználó listájához
  + Lehetőség legyen már a listához adott készletek szerkesztésére, állapotuk megváltoztatására, valamint törlésükre

Nem funkcionális elvárások:
  + Könnyű kezelhetőség
  + Átlátható, reszponzív dizájn

Szakterületi fogalomjegyzék: nincsenek speciális szakkifejezések.

Használatieset-modell
  Szerepkörök: 
  + vendég: a főoldal tartalmához fér hozzá, regisztrálhat, vagy beléphet az oldalra
  + felhasználó: bejelentkezés után az oldal összes funkcióját elérheti
  
Használati eset diagram:
![Használati eseti diagram](documentation_images/nomnoml.png)

Lehetséges folyamat példa:

![Folyamat diagram](documentation_images/folyamat.png)

***

###Tervezés

Architektúra terv:
komponensdiagram
  + Publikus:
    + Főoldal
    + Regisztráció
    + Login
  + Felhasználó:
    + Főoldal
    + Login/Logout
    + Makettkészleteinek listája
        + új készlet hozzáadása
        + meglévő készlet szerkesztése
        + meglévő készlet állapotának változtatása
        + meglévő készlet törlése

Végpontok:
  + GET /: főoldal
  + GET /login: bejelentkező oldal
  + POST /login: bejelentkezési adatok felküldése
  + GET /model_kits/list: saját makettkészleteket listázó oldal
  + GET /model_kits/new: új makettkészlet hozzáadása
  + POST /model_kits/new: új makettkészlet hozzáadása, adatok felküldése
  + GET /model_kits/edit/:id : makettkészlet szerkesztése
  + POST /model_kits/edit/:id : makettkészlet szerkesztése, adatok felküldése
  + GET /model_kits/delete/:id : makettkészlet törlése
  + GET /model_kits/started/:id : makettkészlet állapotának változtatása "Elkezdett"-re
  + GET /model_kits/done/:id : makettkészlet állapotának változtatása "Kész"-re
  + GET /logout: kijelentkezés

Felhasználóifelület-modell:
  + Oldalvázlat:
  + ![Oldalvázlat](documentation_images/vazlat.png)
  
  + Megvalósítva:
  + 
Osztálymodell
        Adatmodell
        Adatbázisterv
        Állapotdiagram
Dinamikus működés
        Szekvenciadiagram


Implementáció
Tesztelés
Felhasználói dokumentáció
