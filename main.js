// Domácí úkol 4 - Statistiky zaměstnanců

/**
 * Generátor seznamu zaměstnanců - pomocné konstanty
 */

const maleNames = [
  "Adam", "Jakub", "Jan", "Tomáš", "Martin", "Lukáš", "Petr", "Pavel",
  "Ondřej", "Michal", "David", "Filip", "Jiří", "Radek", "Marek",
  "Václav", "Zdeněk", "Miroslav", "Stanislav", "Josef", "Aleš", "Karel",
  "Roman", "Milan", "Vojtěch", "Patrik", "Jaroslav", "Dominik", "Libor", "Antonín",
];

const femaleNames = [
  "Jana", "Marie", "Eva", "Petra", "Lenka", "Lucie", "Tereza", "Monika",
  "Martina", "Kateřina", "Alena", "Ivana", "Hana", "Veronika", "Michaela",
  "Barbora", "Zuzana", "Markéta", "Pavla", "Simona", "Nikola", "Andrea",
  "Denisa", "Kristýna", "Renata", "Blanka", "Radka", "Dagmar", "Šárka", "Jitka",
];

const maleSurnames = [
  "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Krejčí",
  "Blažek", "Veselý", "Horák", "Němec", "Pokorný", "Marek", "Pospíšil",
  "Hájek", "Jelínek", "Kratochvíl", "Kovář", "Fiala", "Sedláček", "Vlček",
  "Urban", "Zeman", "Kolář", "Holub", "Malý", "Čermák", "Beneš", "Válek", "Šimánek",
];

const femaleSurnames = [
  "Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Krejčíková",
  "Blažková", "Veselá", "Horáková", "Němcová", "Pokorná", "Marková", "Pospíšilová",
  "Hájková", "Jelínková", "Kratochvílová", "Kovářová", "Fialová", "Sedláčková", "Vlčková",
  "Urbanová", "Zemanová", "Kolářová", "Holubová", "Malá", "Čermáková", "Benešová", "Válková", "Šimánková",
];

const workloads = [10, 20, 30, 40];

/**
 * Vrátí náhodné celé číslo v rozsahu od min do max (včetně obou hranic).
 * @param {number} min minimální hodnota
 * @param {number} max maximální hodnota
 * @returns {number} náhodné celé číslo
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Vrátí náhodný prvek z předaného pole.
 * @param {Array} arr pole, ze kterého se vybírá
 * @returns {*} náhodně vybraný prvek pole
 */
function randomItem(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

/**
 * Vygeneruje náhodné datum narození jako řetězec.
 * Věk výsledné osoby bude v rozsahu ageMin až ageMax let.
 * @param {number} ageMin minimální věk v letech
 * @param {number} ageMax maximální věk v letech
 * @returns {string} datum narození ve formátu ISO
 */
function randomBirthdate(ageMin, ageMax) {
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const earliest = now - ageMax * msPerYear;
  const latest   = now - ageMin * msPerYear;
  const birthTimestamp = earliest + Math.random() * (latest - earliest);
  return new Date(birthTimestamp).toISOString();
}

/**
 * Vypočítá medián z pole čísel.
 * @param {Array} values - Pole číselných hodnot
 * @returns {number} Medián (desetinné číslo)
 */
function calculateMedian(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const length = sorted.length;

  if (length === 0) return 0;

  if (length % 2 === 1) {
    return sorted[Math.floor(length / 2)];
  } else {
    const mid1 = sorted[length / 2 - 1];
    const mid2 = sorted[length / 2];
    return (mid1 + mid2) / 2;
  }
}

/**
 * Vypočítá věk zaměstnance na základě data narození.
 * Věk je počítán jako desetinné číslo pro přesnější statistiky.
 * @param {string} birthdate - Datum narození ve formátu ISO
 * @returns {number} Věk v letech (desetinné číslo)
 */
function calculateAge(birthdate) {
  const currentDate = new Date();
  const birthDate = new Date(birthdate);
  const ageInMs = currentDate - birthDate;
  const ageInYears = ageInMs / (365.25 * 24 * 60 * 60 * 1000);
  return ageInYears;
}

/**
 * Vygeneruje seznam zaměstnanců s náhodnými údaji.
 * Pro každého zaměstnance náhodně určí jméno, příjmení, pohlaví, datum narození a úvazek.
 * @param {object} dtoIn vstupní objekt obsahující počet zaměstnanců a věkové limity {count, age: {min, max}}
 * @returns {Array} pole objektů reprezentujících zaměstnance
 */
export function generateEmployeeData(dtoIn) {
  const { count, age: { min: ageMin, max: ageMax } } = dtoIn;

  const employeeList = [];

  for (let i = 0; i < count; i++) {
    const gender = Math.random() < 0.5 ? "male" : "female";

    const name    = gender === "male" ? randomItem(maleNames)    : randomItem(femaleNames);
    const surname = gender === "male" ? randomItem(maleSurnames)  : randomItem(femaleSurnames);

    const birthdate = randomBirthdate(ageMin, ageMax);
    const workload  = randomItem(workloads);

    employeeList.push({ name, surname, gender, birthdate, workload });
  }

  return employeeList;
}

/**
 * Vypočítá statistiky ze seznamu zaměstnanců včetně průměrů, mediánů a seřazení.
 * @param {Array} employees pole objektů zaměstnanců
 * @returns {object} objekt obsahující vypočtené statistiky
 */
export function getEmployeeStatistics(employees) {
  // Celkový počet zaměstnanců
  const total = employees.length;

  // Počet zaměstnanců podle úvazku
  let workload10 = 0;
  let workload20 = 0;
  let workload30 = 0;
  let workload40 = 0;

  employees.forEach(emp => {
    if (emp.workload === 10) workload10++;
    else if (emp.workload === 20) workload20++;
    else if (emp.workload === 30) workload30++;
    else if (emp.workload === 40) workload40++;
  });

  // Výpočet věků zaměstnanců (jako desetinná čísla)
  const ages = employees.map(emp => calculateAge(emp.birthdate));

  // Průměrný věk (zaokrouhleno na 1 des. místo)
  const sumAges = ages.reduce((sum, age) => sum + age, 0);
  const averageAge = Math.round((sumAges / total) * 10) / 10;

  // Minimální a maximální věk
  const minAge = Math.floor(Math.min(...ages));
  const maxAge = Math.floor(Math.max(...ages));

  // Medián věku
  const medianAge = Math.floor(calculateMedian(ages));

  // Medián úvazku (zaokrouhlen na celé číslo)
  const workloads = employees.map(emp => emp.workload);
  const medianWorkload = Math.round(calculateMedian(workloads));

  // Průměrný úvazek žen
  const women = employees.filter(emp => emp.gender === "female");
  const womenWorkloads = women.map(emp => emp.workload);
  const averageWomenWorkload = womenWorkloads.length > 0
      ? Math.round((womenWorkloads.reduce((sum, w) => sum + w, 0) / womenWorkloads.length))
      : 0;

  // Seřazení podle úvazku (numericky vzestupně)
  const sortedByWorkload = [...employees].sort((a, b) => a.workload - b.workload);

  return {
    total,
    workload10,
    workload20,
    workload30,
    workload40,
    averageAge,
    minAge,
    maxAge,
    medianAge,
    medianWorkload,
    averageWomenWorkload,
    sortedByWorkload
  };
}

/**
 * Hlavní funkce aplikace, která generuje seznam zaměstnanců a vypočítá jejich statistiky.
 * @param {object} dtoIn vstupní objekt obsahující počet zaměstnanců a věkové limity {count, age: {min, max}}
 * @returns {object} objekt obsahující statistiky zaměstnanců
 */
export function main(dtoIn) {
  // Generování seznamu zaměstnanců
  const employees = generateEmployeeData(dtoIn);

  // Výpočet statistik
  const statistics = getEmployeeStatistics(employees);

  // Příprava výstupních dat
  const dtoOut = {
    total: statistics.total,
    workload10: statistics.workload10,
    workload20: statistics.workload20,
    workload30: statistics.workload30,
    workload40: statistics.workload40,
    averageAge: statistics.averageAge,
    minAge: statistics.minAge,
    maxAge: statistics.maxAge,
    medianAge: statistics.medianAge,
    medianWorkload: statistics.medianWorkload,
    averageWomenWorkload: statistics.averageWomenWorkload,
    sortedByWorkload: statistics.sortedByWorkload
  };

  return dtoOut;
}

