//#region GLOBALNE VARIJABLE
//var server = 'http://localhost:8080/'; // lokalno
var server = 'https://dedal-api.appspot.com/'; // na gCloudu
var projekt = 'dani-nastavnika';
var editPredavanje = -1;
var editObavijest = -1;
var editRadionicu = -1;
var editPredavaca = -1;
var aktivnaStranica = "";
var predavanjaSektori = {};
//#endregion

//#region Modul raspored
var Predavanje = function(id, naslov, predavac, pocetak, kraj, poredak){
    var id = id;
    var naslov = naslov;
    var predavac = predavac;
    var pocetakTekst = pocetak;
    var krajTekst = kraj;
    var poredak = poredak;
    var pocetak = (pocetakTekst == "" ? "" : new Date(String(pocetakTekst)));
    var kraj = (krajTekst == "" ? "" : new Date(String(krajTekst)));

    function getId(){
        return Number(id);
    }
    function getNaslov(){
        return naslov;
    }
    function getPredavac(){
        return predavac;
    }
    function getDatumPocetka(){
        return (pocetak == "" ? "-" : formatirajDatum(pocetak));
    }
    function getDatumKraja(){
        return (kraj == "" ? "-" : formatirajDatum(kraj));
    }
    function getVrijemePocetka(){
        return (pocetak == "" ? "-" : formatirajVrijeme(pocetak));
    }
    function getVrijemeKraja(){
        return (kraj == "" ? "-" : formatirajVrijeme(kraj));
    }
    function getTekstualniPocetak(){
        if(pocetak == ""){
            return pocetak;
        }else{
            return pocetak.getFullYear() + "/" + vratiSNulom(Number(pocetak.getMonth()) + 1) + "/" + vratiSNulom(pocetak.getDate()) + " " + formatirajVrijeme(pocetak);
        }
    }
    function getTekstualniKraj(){
        if(kraj == ""){
            return kraj;
        }else{
            return kraj.getFullYear() + "/" + vratiSNulom(Number(kraj.getMonth()) + 1) + "/" + vratiSNulom(kraj.getDate()) + " " + formatirajVrijeme(kraj);
        }
    }
    function getPoredak(){
        return poredak;
    }

    function setNaslov(novo){
        naslov = novo;
    }
    function setPredavac(novo){
        predavac = novo;
    }
    function setPocetak(novo){
        pocetakTekst = novo;
        pocetak = (pocetakTekst == "" ? "" : new Date(String(pocetakTekst)));
    }
    function setKraj(novo){
        krajTekst = novo;
        kraj = (krajTekst == "" ? "" : new Date(String(krajTekst)));
    }
    function setPoredak(novo){
        poredak = novo;
    }
    
    function construct(){
        var template = `
            <tr data-id="${id}">
                <td class="td-poredak">${poredak}.</td>
                <td class="td-datum">${getDatumPocetka()}</td>
                <td class="td-pocetak">${getVrijemePocetka()}</td>
                <td class="td-kraj">${getVrijemeKraja()}</td>
                <td class="td-naslov">${naslov}</td>
                <td class="td-predavac">${predavac}</td>
                <td class="td-uredi"><button type="button" onClick="urediPredavanje(${id});"  class="btn-primary btn-raspored" id="btn-uredi"><i class="fas fa-edit"></i> Uredi</button></td>
                <td class="td-obrisi"><button type="button" onClick="obrisiPredavanje(${id});" class="btn-primary btn-raspored" id="btn-obriši"><i class="fas fa-trash-alt"></i> Obriši</button></td>
            </tr>
        `;
        return $(template);
    }

    function constructSingle(){
        var template = `
            <div class="raspored-stavka">
                <div class="raspored-vrijeme">${getVrijemePocetka()}${(getVrijemeKraja() != "-" ? " - " + getVrijemeKraja() : "")}</div>
                <div class="raspored-naslov">${naslov}</div>
                <div class="raspored-predavac">${predavac}</div>
            </div>
        `;
        return template;
    }

    return {
        getId: getId,
        getNaslov: getNaslov,
        getPredavac: getPredavac,
        getDatumPocetka: getDatumPocetka,
        getDatumKraja: getDatumKraja,
        getVrijemePocetka: getVrijemePocetka,
        getVrijemeKraja: getVrijemeKraja,
        getTekstualniPocetak: getTekstualniPocetak,
        getTekstualniKraj: getTekstualniKraj,
        getPoredak: getPoredak,
        construct: construct,
        constructSingle: constructSingle,
        setNaslov: setNaslov,
        setPredavac: setPredavac,
        setPocetak: setPocetak,
        setKraj: setKraj,
        setPoredak: setPoredak
    }
}
var raspored = [];
//#endregion

//#region Modul novosti
var Obavijest = function(id, naslov, tekst, kreirano){
    var id = id;
    var naslov = naslov;
    var tekst = tekst;
    var kreiranoTekst = kreirano;
    var kreirano = new Date(String(kreiranoTekst));    

    function getId(){
        return Number(id);
    }
    function getNaslov(){
        return naslov;
    }
    function getTekst(){
        return tekst;
    }
    function getShortTekst(){
        var shortTekst = tekst.substring(0,200);
        shortTekst = shortTekst.replace(/<[^>]*>/g, '');
        shortTekst = shortTekst + "...";
        return shortTekst;
    }
    function getDatumKreiranja(){
        return formatirajDatum(kreirano) + " " + formatirajVrijeme(kreirano);
    }

    function getLijepiDatum(){
        var mjesec = Number(kreirano.getMonth()) + 1;

        var tekstMjesec;
        switch (mjesec) {
            case 1:
                tekstMjesec = "sij";
                break;
            case 2:
                tekstMjesec = "velj";
                break;
            case 3:
                tekstMjesec = "ožu";
                break;
            case 4:
                tekstMjesec = "tra";
                break;
            case 5:
                tekstMjesec = "svi";
                break;
            case 6:
                tekstMjesec = "lip";
                break;
            case 7:
                tekstMjesec = "srp";    
                break;
            case 8:
                tekstMjesec = "kol";
                break;
            case 9:
                tekstMjesec = "ruj";
                break;
            case 10:
                tekstMjesec = "lis";
                break;
            case 11:
                tekstMjesec = "stu";
                break;
            case 12:
                tekstMjesec = "pro";
                break;
            default:
                break;
        }
        return vratiSNulom(kreirano.getDate()) + " " + tekstMjesec + " " + formatirajVrijeme(kreirano);
    }

    function setNaslov(novo){
        naslov = novo;
    }
    function setTekst(novo){
        tekst = novo;
    }
    
    function construct(){
        var template = `
            <tr data-id="${id}">
                <td class="td-kreirano">${getDatumKreiranja()}</td>
                <td class="td-naslov">${naslov}</td>
                <td class="td-tekst">${tekst}</td>
                <td class="td-uredi"><button type="button" onClick="urediObavijest(${id});"  class="btn-primary btn-raspored" id="btn-uredi"><i class="fas fa-edit"></i> Uredi</button></td>
                <td class="td-obrisi"><button type="button" onClick="obrisiObavijest(${id});" class="btn-primary btn-raspored" id="btn-obriši"><i class="fas fa-trash-alt"></i> Obriši</button></td>
            </tr>
        `;
        return $(template);
    }

    function constructSingle(){
        var template = `
            <div class="obavijest" data-id="${id}">
                <h5 class="naslov-obavijesti">${naslov}</h5>
                <p class="datum-obavijesti">${this.getLijepiDatum()}</p>
                <p class="tekst-obavijesti">${this.getShortTekst()}</p>
                ${tekst.length > 200 ? '<button class="vise-button" data-id="' + id + '" data-akcija="vise">POGLEDAJ VIŠE</button>' : '' }
            </div>
        `;
        return template;
    }

    return {
        getId: getId,
        getNaslov: getNaslov,
        getTekst: getTekst,
        getShortTekst: getShortTekst,
        getDatumKreiranja: getDatumKreiranja,
        getLijepiDatum: getLijepiDatum,
        construct: construct,
        constructSingle: constructSingle,
        setNaslov: setNaslov,
        setTekst: setTekst
    }
}
var novosti = [];
//#endregion

//#region Modul predavanja
var Radionica = function(id, naslov, idPredavaca, pocetak, kraj, sazetak, dvorana, sektor, upisId){
    var id = id;
    var naslov = naslov;
    var predavaciArray = [];
    if(Array.isArray(idPredavaca)){
        for(let i in idPredavaca){
            predavaciArray.push(Number(idPredavaca[i]));
        }
    }else{
        predavaciArray.push(Number(idPredavaca));
    }    
    
    var pocetakTekst = pocetak;
    var krajTekst = kraj;
    var pocetak = (pocetakTekst == "" ? "" : new Date(String(pocetakTekst)));
    var kraj = (krajTekst == "" ? "" : new Date(String(krajTekst)));
    var sazetak = sazetak;
    var dvorana = dvorana;
    var sektor = sektor;
    var upisId = upisId;

    var dvorane = [
        "Hall Šibenik I",
        "Hall Šibenik II",
        "Hall Šibenik III",
        "Hall Šibenik IV",
        "Hall Šibenik V",
        "Hall Šibenik VI",
        "Hall Šibenik VII",
        "Hall Šibenik VIII",
        "Hall Šibenik IX",
        "Hall Šibenik X",
        "Hall Šibenik XI",
        "Žirje",
        "Lavsa"
    ];
    var sektori = [
        "Poljoprivreda, prehrana i veterina",
        "Šumarstvo, prerada i obrada drva",
        "Geologija, rudarstvo, nafta i kemijska tehnologija",
        "Tekstil i koža",
        "Grafička tehnologija i audio-vizualna tehnologija",
        "Strojarstvo, brodogradnja i metalurgija",
        "Elektrotehnika i računarstvo",
        "Graditeljstvo i geodezija",
        "Ekonomija, trgovina i poslovna administracija",
        "Turizam i ugostiteljstvo",
        "Promet i logistika",
        "Zdravstvo i socijalna skrb",
        "Osobne, usluge zaštite i druge usluge"
    ];

    function getId(){
        return Number(id);
    }
    function getNaslov(){
        return naslov;
    }
    function getPredavac(){
        var pred = [];    
        for(let i in predavaci){            
            if(predavaciArray.includes(predavaci[i].getId())){
                pred.push(predavaci[i].getImePrezime());
            }
        }
        return pred.toString().replace(",", ", ");
    }
    function getPredavaciArray(){
        var pred = [];
        for(let i in predavaci){
            if(predavaciArray.includes(predavaci[i].getId())){
                pred.push(predavaci[i]);
            }
        }
        return pred;
    }
    function getDatumPocetka(){
        return (pocetak == "" ? "-" : formatirajDatum(pocetak));
    }
    function getDatumKraja(){
        return (kraj == "" ? "-" : formatirajDatum(kraj));
    }
    function getVrijemePocetka(){
        return (pocetak == "" ? "-" : formatirajVrijeme(pocetak));
    }
    function getVrijemeKraja(){
        return (kraj == "" ? "-" : formatirajVrijeme(kraj));
    }
    function getTekstualniPocetak(){
        if(pocetak == ""){
            return pocetak;
        }else{
            return pocetak.getFullYear() + "/" + vratiSNulom(Number(pocetak.getMonth()) + 1) + "/" + vratiSNulom(pocetak.getDate()) + " " + formatirajVrijeme(pocetak);
        }
    }
    function getTekstualniKraj(){
        if(kraj == ""){
            return kraj;
        }else{
            return kraj.getFullYear() + "/" + vratiSNulom(Number(kraj.getMonth()) + 1) + "/" + vratiSNulom(kraj.getDate()) + " " + formatirajVrijeme(kraj);
        }
    }
    function getSazetak(){
        return sazetak;
    }
    function getDvorana(){
        var dvoranePovrat = [];
        for(let i in dvorana){
            dvoranePovrat.push(dvorane[Number(dvorana[i])]);
        }
        dvoranePovrat = dvoranePovrat.join(", ");
        return dvoranePovrat;
    }
    function getDvoranaID(){
        return dvorana;
    }
    function getSektor(){
        if(sektor != ""){
            return sektori[Number(sektor)];
        }else{
            return sektor;
        }
    }
    function getSektorID(){
        return sektor;
    }
    function getUpisId(){
        return upisId;
    }
    function getLijepiDatum(){
        var mjesec = Number(pocetak.getMonth()) + 1;

        var tekstMjesec;
        switch (mjesec) {
            case 1:
                tekstMjesec = "siječanj";
                break;
            case 2:
                tekstMjesec = "veljača";
                break;
            case 3:
                tekstMjesec = "ožujak";
                break;
            case 4:
                tekstMjesec = "travanj";
                break;
            case 5:
                tekstMjesec = "svibanj";
                break;
            case 6:
                tekstMjesec = "lipanj";
                break;
            case 7:
                tekstMjesec = "srpanj";    
                break;
            case 8:
                tekstMjesec = "kolovoz";
                break;
            case 9:
                tekstMjesec = "rujan";
                break;
            case 10:
                tekstMjesec = "listopad";
                break;
            case 11:
                tekstMjesec = "studeni";
                break;
            case 12:
                tekstMjesec = "prosinac";
                break;
            default:
                break;
        }
        return vratiSNulom(pocetak.getDate()) + ". " + tekstMjesec;
    }

    function setNaslov(novo){
        naslov = novo;
    }
    function setPredavac(novo){
        predavac = novo;
    }
    function setPocetak(novo){
        pocetakTekst = novo;
        pocetak = (pocetakTekst == "" ? "" : new Date(String(pocetakTekst)));
    }
    function setKraj(novo){
        krajTekst = novo;
        kraj = (krajTekst == "" ? "" : new Date(String(krajTekst)));
    }
    function setSazetak(novo){
        sazetak = novo;
    }
    function setDvorana(novo){
        dvorana = novo;
    }
    function setSektor(novo){
        sektor = novo;
    }
    
    function construct(){
        var template = `
            <tr data-id="${id}">
                <td class="td-datum">${getDatumPocetka()}</td>
                <td class="td-pocetak">${getVrijemePocetka()}</td>
                <td class="td-kraj">${getVrijemeKraja()}</td>
                <td class="td-naslov">${naslov}</td>
                <td class="td-predavac">${getPredavac()}</td>
                <td class="td-sazetak">${sazetak}</td>
                <td class="td-dvorana">${getDvorana()}</td>
                <td class="td-sektor">${getSektor()}</td>
                 <td class="td-uredi"><button type="button" onClick="urediRadionicu(${id});"  class="btn-primary btn-raspored" id="btn-uredi"><i class="fas fa-edit"></i> Uredi</button></td>
                <td class="td-obrisi"><button type="button" onClick="obrisiRadionicu(${id});" class="btn-primary btn-raspored" id="btn-obriši"><i class="fas fa-trash-alt"></i> Obriši</button></td>
            </tr>
        `;
        return $(template);
    }
    function constructSingle(){  
        var predavaciArr = getPredavaciArray();
        var predavaciString = "";
        for(let i in predavaciArr){
            predavaciString += `
                <a href="javascript:void(0)" data-id="${predavaciArr[i].getId()}" class="predavaci-predavanja-link">${predavaciArr[i].getImePrezime()}</a>
            `
        }
        var template = `
            <div class="raspored-stavka">
                <div class="raspored-dvorana">${getDvorana()}</div>
                <div class="raspored-vrijeme">${getVrijemePocetka()} - ${getVrijemeKraja()}</div>
                <div class="raspored-naslov">${naslov}</div>
                <div class="raspored-predavac">${predavaciString}</div>
            </div>
        `;
        return template;
    }

    return {
        getId: getId,
        getNaslov: getNaslov,
        getPredavac: getPredavac,
        getPredavaciArray: getPredavaciArray,
        getDatumPocetka: getDatumPocetka,
        getDatumKraja: getDatumKraja,
        getVrijemePocetka: getVrijemePocetka,
        getVrijemeKraja: getVrijemeKraja,
        getTekstualniPocetak: getTekstualniPocetak,
        getTekstualniKraj: getTekstualniKraj,
        getSazetak: getSazetak,
        getDvorana: getDvorana,
        getDvoranaID: getDvoranaID,
        getSektor: getSektor,
        getSektorID: getSektorID,
        getUpisId: getUpisId,
        getLijepiDatum: getLijepiDatum,
        construct: construct,
        constructSingle: constructSingle,
        setNaslov: setNaslov,
        setPredavac: setPredavac,
        setPocetak: setPocetak,
        setKraj: setKraj,
        setSazetak: setSazetak,
        setDvorana: setDvorana,
        setSektor: setSektor
    }
}
var predavanja = [];
//#endregion

//#region Modul predavači
var Predavac = function(id, ime, prezime, predavanjaPredavaca, slika, zivotopis){
    var id = id;
    var ime = ime;
    var prezime = prezime;
    var predavanjaArray = [];
    if(!Array.isArray(predavanjaPredavaca)){
        predavanjaArray.push(Number(predavanjaPredavaca));
    }else{
        for(let i in predavanjaPredavaca){
            predavanjaArray.push(Number(predavanjaPredavaca[i]));
        }
    }
    
    var slika = slika;
    var zivotopis = zivotopis;

    function getId(){
        return Number(id);
    }
    function getIme(){
        return ime;
    }
    function getPrezime(){
        return prezime;
    }
    function getImePrezime(){
        return ime + " " + prezime;
    }
    function getPredavanjaString(){
        var pred = [];
        for(let i in predavanja){
            if(predavanjaArray.includes(predavanja[i].getId())){
                pred.push(predavanja[i].getNaslov());
            }
        }
        return pred.toString().replace(",", ", ");
    }
    function getPredavanjaArray(){
        var pred = [];
        for(let i in predavanja){
            if(predavanjaArray.includes(predavanja[i].getId())){
                pred.push(predavanja[i]);
            }
        }
        return pred;
    }
    function getSlika(){
        var slikaUrl = (slika != "" ? slika : "default-image.jpg");
        var slikaTemplejt = `<img src="../asoo/img/predavaci/${slikaUrl}" alt="${ime}" class="img-responsive predavac-img-tablica"/>`;
        return slikaTemplejt;
    }
    function getSlikaUrl(){
        return slika;
    }
    function getZivotopis(){
        return zivotopis;
    }
    function getShortZivotopis(){
        var shortTekst = zivotopis.substring(0,200);
        shortTekst = shortTekst.replace(/<[^>]*>/g, '');
        shortTekst = shortTekst + "...";
        return shortTekst;
    }

    function setIme(novo){
        ime = novo;
    }
    function setPrezime(novo){
        prezime = novo;
    }
    function setPredavanja(novo){
        if(!Array.isArray(novo)){
            predavanjaArray = [];
            predavanjaArray.push(Number(novo))
        }else{
            predavanjaArray = novo;
        }
    }
    function setSlika(novo){
        slika = novo;
    }
    function setZivotopis(novo){
        zivotopis = novo;
    }
    
    function construct(){
        var template = `
            <tr data-id="${id}">
                <td class="td-ime">${getImePrezime()}</td>
                <td class="td-slika">${getSlika()}</td>
                <td class="td-predavanja">${getPredavanjaString()}</td>
                <td class="td-opis">${getShortZivotopis()}</td>
                <td class="td-uredi"><button type="button" onClick="urediPredavaca(${id});" class="btn-primary btn-raspored" id="btn-uredi"><i class="fas fa-edit"></i> Uredi</button></td>
                <td class="td-obrisi"><button type="button" onClick="obrisiPredavaca(${id});" class="btn-primary btn-raspored" id="btn-obriši"><i class="fas fa-trash-alt"></i> Obriši</button></td>
            </tr>
        `;
        return $(template);
    }
    function constructSingle(){
        var predavanjaArr = getPredavanjaArray();
        var predavanjaString = "";
        for(let i in predavanjaArr){
            predavanjaString += `
                <div class="predavanja-stavka">
                    <div class="predavanja-naslov">${predavanjaArr[i].getNaslov()}</div>
                    <div class="raspored-dvorana predavanja-dvorana">${predavanjaArr[i].getDvorana()}</div>
                    <div class="raspored-vrijeme predavanje-vrijeme">${predavanjaArr[i].getVrijemePocetka()} - ${predavanjaArr[i].getVrijemeKraja()}</div>
                </div>
            `;
        }
        var template = `
            <div class="program-datum kutija predavac-grupa collapse-btn" data-id="predavac-${id}" data-akcija="prikazi">${getImePrezime()}</div>
            <div class="predavac-grupa-wrap collapse-elem" data-id="predavac-${id}">
                <div class="predavac-wrap">
                    <div class="predavac-slika">${getSlika()}</div>
                    <div class="predavac-ime">${getImePrezime()}</div>
                    <div class="predavac-opis">${zivotopis}</div>
                    <div class="predavac-predavanja-naslov">Predavanja</div>
                    ${predavanjaString}
                </div>
            </div>
        `;
        return template;
    }
    function constructSidebar(){
        var predavanjaArr = getPredavanjaArray();
        var predavanjaString = "";
        for(let i in predavanjaArr){
            predavanjaString += `
                <div class="predavanja-stavka">
                    <div class="predavanja-naslov">${predavanjaArr[i].getNaslov()}</div>
                    <div class="raspored-dvorana predavanja-dvorana">${predavanjaArr[i].getDvorana()}</div>
                    <div class="raspored-vrijeme predavanje-vrijeme">${predavanjaArr[i].getVrijemePocetka()} - ${predavanjaArr[i].getVrijemeKraja()}</div>
                </div>
            `;
        }
        var template = `
            <div class="predavac-sidebar">
                <div class="sidebar-slika">${getSlika()}</div>
                <div class="predavac-ime sidebar-ime">${getImePrezime()}</div>
                <div class="sidebar-zivotopis">${zivotopis}</div>
                <div class="sidebar-predavanja">
                    <div class="predavac-predavanja-naslov">Predavanja</div>
                    <div class="sidebar-predavanja-wrap">${predavanjaString}</div>
                </div>
            </div>
        `;
        return template;
    }

    return {
        getId: getId,
        getIme: getIme,
        getPrezime: getPrezime,
        getImePrezime: getImePrezime,
        getPredavanjaString: getPredavanjaString,
        getPredavanjaArray: getPredavanjaArray,
        getSlika: getSlika,
        getSlikaUrl: getSlikaUrl,
        getZivotopis: getZivotopis,
        getShortZivotopis: getShortZivotopis,
        setIme: setIme,
        setPrezime: setPrezime,
        setPredavanja: setPredavanja,
        setSlika: setSlika,
        setZivotopis: setZivotopis,
        construct: construct,
        constructSingle: constructSingle,
        constructSidebar: constructSidebar
    }
}
var predavaci = [];
//#endregion

//#region Modul hoteli
var Hotel = function(id, naslov, dvorane){
    var id = id;
    var naslov = naslov;
    var dvorane = dvorane;

    function getId(){
        return id;
    }
    function getNaslov(){
        return naslov;
    }
    function constructSingle(){
        var brojac = 0;
        var templejt = "";
        for(let i in dvorane){
            templejt += `
                <div class="program-datum kutija raspored-sektor collapse-btn" data-id="dvorana-${brojac}-${id}" data-akcija="prikazi">${dvorane[i].naslov}</div>
                <div class="raspored-sektor-wrap collapse-elem" data-id="dvorana-${brojac}-${id}">
                    <div class="dvorana-slika">
                        <h3 class="dvorana-kat">${dvorane[i].kat}</h2>
                        <img src="./img/dvorane/${dvorane[i].slika}" class="img-responsive img-dvorana">
                    </div>
                </div>
            `;
            brojac++;
        }
        return templejt;
    }

    return {
        getId: getId,
        getNaslov: getNaslov,
        constructSingle: constructSingle
    }
}
var hoteli = [];
hoteli.push(new Hotel(0, "Convention centre Šibenik", [
    {
        "naslov": "Dvorane 1 - 2",
        "slika": "1-2.png",
        "kat": "Prizemlje"
    },
    {
        "naslov": "Dvorane 3 - 6",
        "slika": "3-6.png",
        "kat": "Razina -1"
    },
    {
        "naslov": "Dvorane 7 - 9",
        "slika": "7-9.png",
        "kat": "1. kat"
    },
    {
        "naslov": "Dvorane 10 - 11",
        "slika": "10-11.png",
        "kat": "Mezzanine 0/-1"
    }
]));
hoteli.push(new Hotel(1, "Hotel Ivan", [
    {
        "naslov": "Žirje",
        "slika": "Ivan.png",
        "kat": "Prizemlje"
    },
    {
        "naslov": "Lavsa",
        "slika": "Ivan.png",
        "kat": "Prizemlje"
    }
]));
hoteli.push(new Hotel(2, "Hotel Andrija"));
/*hoteli.push(new Hotel(2, "Hotel Jure", [
    {
        "naslov": "Event room Jure",
        "slika": "Jure.png",
        "kat": "Prizemlje"
    }
]));
*/

/*
hoteli.push(new Hotel(3, "Hotel Niko", [
    {
        "naslov": "Krka I",
        "slika": "Niko.png",
        "kat": "Prizemlje"
    },
    {
        "naslov": "Krka II",
        "slika": "Niko.png",
        "kat": "Prizemlje"
    },
    {
        "naslov": "Krka II",
        "slika": "Niko.png",
        "kat": "Prizemlje"
    }
]));
 */
//#endregion

//#region Modul navigacija
var templateStranice = {};
var Stranica = function (id, naziv, kolbek) {
    var id = id;
    var naziv = naziv;
    var html = html;
    var kolbek = kolbek;
    function getId() {
        return id;
    }
    function getNaziv() {
        return naziv;
    }
    function getHtml() {
        if (html != "") {
            if(!templateStranice.hasOwnProperty(id)){
                var ret = $(`#templejt-${id}`).html();
                templateStranice[id] = ret;
                return ret;
            }else{
                return templateStranice[id];
            }
        } else {
            return html;
        }
    }
    function ucitajStranicu() {
        var ucitano = this.getHtml();
        aktivnaStranica = id;
        $("#sadrzaj").html(ucitano);
        $(".header h1").html(naziv);
        $("#sadrzaj").addClass("active");
        if(aktivnaStranica == "eventa"){
            $(".header").addClass("sivo");
        }else{
            $(".header").addClass("plavo");
        }
        $(".nav_icons").addClass("aktiv-nav");
        $(".header-ikona").attr("data-id", "back");
        if($(".nav-sidebar").hasClass("active")){
            $(".nav-sidebar").removeClass("active");
            $(".nav-overlay").removeClass("active");
        }
        if(typeof(kolbek) != "undefined"){
            kolbek();
        }
    }

    return {
        getId: getId,
        getNaziv: getNaziv,
        getHtml: getHtml,
        ucitajStranicu: ucitajStranicu
    }
}

var stranice = {};
stranice.obavijesti = new Stranica("obavijesti", "Obavijesti", () => otvoriObavijesti());
stranice.informacije = new Stranica("informacije", "Informacije");
stranice.program = new Stranica("program", "Program", () => otvoriProgram());
stranice.raspored = new Stranica("raspored", "Raspored", () => otvoriRaspored());
stranice.predavaci = new Stranica("predavaci", "Predavači", () => otvoriPredavace());
stranice.mapa = new Stranica("mapa", "Mapa", () => otvoriMape());
stranice.eventa = new Stranica("eventa", "Eventa");
stranice.o_projektu = new Stranica("o_projektu", "O projektu");

//#region Kolbek funkcije
function otvoriObavijesti(){
    if(neprocitaneNovosti != ""){
        $(".obavijest-wrap").html(pocetniHTMLNovosti);
        for(let i in neprocitaneNovosti){
            if(user == null) user = {};
            if(!user.hasOwnProperty("novosti")) user.novosti = [];
            user.novosti.push(neprocitaneNovosti[i]);
            let zaLokalno = JSON.stringify(user);
            sejvajLokalno("dani-nastavnika", zaLokalno);
        }
    }
    var templejt = "";
    for(let i in novosti){
        templejt += novosti[i].constructSingle();
    }    

    $(".obavijesti-append").html(templejt);
}
function otvoriProgram(){
    var templejt = "";
    var trenutniDatum = "";
    for(let i in raspored){
        if(raspored[i].getDatumPocetka() != trenutniDatum){
            if(i > 0){
                templejt += "</div>";
            }
            templejt += `
                <div class="program-datum kutija">${raspored[i].getDatumPocetka()}</div>
                <div class="raspored-grupa">
            `;
            trenutniDatum = raspored[i].getDatumPocetka();
        }
        templejt += raspored[i].constructSingle();
    }    

    $(".program-append").html(templejt);
}
function otvoriRaspored(){
    var templejt = "";
    var brojacDana = 0;
    var brojacSektora = 0;
    for(let i in predavanjaSektori){
        templejt += `
            <div class="program-datum kutija raspored-datum collapse-btn" data-id="datum-${brojacDana}" data-akcija="prikazi">${i}</div>
            <div class="raspored-dan-wrap collapse-elem" data-id="datum-${brojacDana}">
        `;
        let danPredavanja = predavanjaSektori[i];
        for(let j in danPredavanja){
            if(j != "bezSektora"){
                templejt += `
                    <div class="program-datum kutija raspored-sektor collapse-btn" data-id="sektor-${brojacSektora}" data-akcija="prikazi">${j}<br><span class="dvorana-kartica">${danPredavanja[j][1] ? danPredavanja[j][1].getDvorana() : ""}</span></div>
                    <div class="raspored-sektor-wrap collapse-elem" data-id="sektor-${brojacSektora}">
                `;
            }
            let sektorPredavanja = danPredavanja[j];
            for(let k in sektorPredavanja){
                if(j == "bezSektora" && i == "24. listopad"){
                    templejt += `
                        <div class="program-datum kutija raspored-sektor collapse-btn" data-id="predavanje-${sektorPredavanja[k].getId()}" data-akcija="prikazi">${sektorPredavanja[k].getNaslov()}<br><span class="dvorana-kartica">${sektorPredavanja[k].getDvorana()}</span></div>
                        <div class="raspored-sektor-wrap collapse-elem" data-id="predavanje-${sektorPredavanja[k].getId()}">
                    `;
                }
                templejt += sektorPredavanja[k].constructSingle();
                if(j == "bezSektora" && i == "24. listopad"){
                    templejt += "</div>";
                }
            }
            if(j != "bezSektora"){
                templejt += "</div>";
            }
            brojacSektora++;
        }
        templejt += "</div>";
        brojacDana++;
    }    

    $(".raspored-append").html(templejt);
}
function otvoriPredavace(){
    var templejt = "";
    var brojac = 0;
    var nazivi = {};
    var trenutni;
    for(let i in predavaci){
        if(brojac % 5 == 0){
            trenutni = brojac;
            nazivi["naziv-" + trenutni] = {};
            nazivi["naziv-" + trenutni].prvi = predavaci[i].getPrezime().substring(0,3);
            templejt += `
                <div class="program-datum kutija predavaci-grupa collapse-btn" data-id="predavaci-${brojac}" data-akcija="prikazi">{{naziv-${trenutni}}}</div>
                <div class="predavaci-grupa-wrap collapse-elem" data-id="predavaci-${brojac}">
            `;
        }
        templejt += predavaci[i].constructSingle();
        brojac++;
        if(brojac % 5 == 0 || typeof(predavaci[Number(i) + 1]) == "undefined"){
            templejt += "</div>";
            nazivi["naziv-" + trenutni].drugi = predavaci[i].getPrezime().substring(0,3);
        }
    }
    for(let i in nazivi){
        templejt = templejt.replace("{{"+i+"}}", nazivi[i].prvi + " - " + nazivi[i].drugi);
    }

    $(".predavaci-append").html(templejt);
}
function otvoriMape(){
    var templejt = "";
    for(let i in hoteli){
        templejt += `
            <div class="program-datum kutija raspored-datum collapse-btn" data-id="hotel-${hoteli[i].getId()}" data-akcija="prikazi">${hoteli[i].getNaslov()}</div>
            <div class="raspored-dan-wrap collapse-elem" data-id="hotel-${hoteli[i].getId()}">
        `;
        templejt += hoteli[i].constructSingle();
        templejt += "</div>";
    }

    $(".mape-append").html(templejt);
}
//#endregion
//#endregion

//#region Pomoćne funkcije
//#region Vrati s nulom
function vratiSNulom(broj){ // Pošto Date ne vraća datum/mjesec/vrijeme sa početnom nulom, funkcija koja vraća
    if(broj < 10){
        return "0" + String(broj);
    }else{
        return String(broj);
    }
}
//#endregion
//#region Formatiraj datum
function formatirajDatum(datum){
    return vratiSNulom(datum.getDate()) + "." + vratiSNulom(Number(datum.getMonth()) + 1) + ".";
}
//#endregion
//#region Formatiraj vrijeme
function formatirajVrijeme(datum){
    return vratiSNulom(datum.getHours()) + ":" + vratiSNulom(datum.getMinutes());
}
//#endregion
//#region Nađi element
function nadiElement(modul, id){
    var ret;
    for(let i in modul){
        if(modul[i].getId() == id){
            ret = modul[i];
            break;
        }
    }
    return ret;
}
//#endregion
//#endregion