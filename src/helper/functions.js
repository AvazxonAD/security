const cyrlToLatin = {
    Ғ: 'G`',
    ғ: 'g`',
    ў: 'o`',
    Ў: 'O`',
    ъ: '`',
    е: 'e',
    Е: 'E',
    ю: 'iu',
    Ю: 'IU',
    я: 'ya',
    Я: 'Ya',
    ё: 'yo',
    Ё: 'YO',
    б: 'b',
    ч: 'ch',
    ц: 'c',
    ш: 'sh',
    щ: 'shch',
    й: 'y',
    а: 'a',
    д: 'd',
    ф: 'f',
    г: 'g',
    х: 'h',
    и: 'i',
    ж: 'j',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    қ: 'q',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    в: 'v',
    уа: 'w',
    кс: 'x',
    з: 'z',
    Б: 'B',
    Ч: 'CH',
    Ц: 'C',
    Ш: 'SH',
    Щ: 'SHCH',
    Й: 'Y',
    А: 'A',
    Д: 'D',
    Ф: 'F',
    Г: 'G',
    Х: 'H',
    И: 'I',
    Ж: 'J',
    К: 'K',
    Л: 'L',
    М: 'M',
    Н: 'N',
    О: 'O',
    П: 'P',
    Қ: 'Q',
    Р: 'R',
    С: 'S',
    Т: 'T',
    У: 'U',
    В: 'V',
    УА: 'W',
    КС: 'X',
    З: 'Z',
};

const latinToCyrl = {
    "G'": 'Ғ',
    "g'": 'ғ',
    "o'": 'ў',
    "O'": 'Ў',
    'G`': 'Ғ',
    'g`': 'ғ',
    'o`': 'ў',
    'O`': 'Ў',
    "'": 'ъ',
    '`': 'ъ',
    ye: 'е',
    Ye: 'Е',
    yu: 'ю',
    Yu: 'Ю',
    YU: 'Ю',
    ya: 'я',
    YA: 'Я',
    Ya: 'Я',
    yo: 'ё',
    Yo: 'Ё',
    YO: 'Ё',
    b: 'б',
    ch: 'ч',
    ts: 'ц',
    sh: 'ш',
    Sh: 'Ш',
    shch: 'щ',
    iu: 'ю',
    a: 'а',
    c: 'ц',
    d: 'д',
    e: 'е',
    f: 'ф',
    g: 'г',
    h: 'х',
    i: 'и',
    j: 'ж',
    k: 'к',
    l: 'л',
    m: 'м',
    n: 'н',
    o: 'о',
    p: 'п',
    q: 'қ',
    r: 'р',
    s: 'с',
    t: 'т',
    u: 'у',
    v: 'в',
    w: 'уа',
    x: 'x',
    y: 'й',
    z: 'з',
    B: 'Б',
    CH: 'Ч',
    TS: 'Ц',
    SH: 'Ш',
    SHCH: 'Щ',
    IU: 'Ю',
    A: 'А',
    C: 'Ц',
    D: 'Д',
    E: 'Е',
    F: 'Ф',
    G: 'Г',
    H: 'Х',
    I: 'И',
    J: 'Ж',
    K: 'К',
    L: 'Л',
    M: 'М',
    N: 'Н',
    O: 'О',
    P: 'П',
    Q: 'Қ',
    R: 'Р',
    S: 'С',
    T: 'Т',
    U: 'У',
    V: 'В',
    W: 'УА',
    X: 'КС',
    Y: 'Й',
    Z: 'З',
};

exports.textLatinToCyrl = (string) => {
    if (typeof string !== 'string') {
        return '';
    }

    let answer = '';
    for (let i = 0; i < string.length; i++) {
        const threeChars = string.slice(i, i + 3);
        const twoChars = string.slice(i, i + 2);

        if (latinToCyrl[threeChars]) {
            answer += latinToCyrl[threeChars];
            i += 2;
        } else if (latinToCyrl[twoChars]) {
            answer += latinToCyrl[twoChars];
            i += 1;
        } else if (latinToCyrl[string[i]]) {
            answer += latinToCyrl[string[i]];
        } else {
            answer += string[i];
        }
    }

    return answer;
};


exports.textCyrlToLatin = (string) => {
    if (typeof string !== 'string') {
        return '';
    }

    let answer = '';
    for (const str of string) {
        if (cyrlToLatin[str]) {
            answer = answer + cyrlToLatin[str];
        } else if (latinToCyrl[str]) {
            answer = answer + str;
        }
    }

    return !!answer ? answer : '';
};


exports.Functions = class {
    static stringSumma(num) {
        if (Number.isInteger(num)) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ",00";
        }
        else {
            let parts = num.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return parts.join(",");
        }
    };
}