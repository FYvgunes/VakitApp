// Örnek dua verileri
const localDuas = [
  {
    id: 1,
    category: "Sabah Duaları",
    title: "Sabah Duası",
    arabic: "اَللّٰهُمَّ بِكَ اَصْبَحْنَا وَبِكَ اَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَاِلَيْكَ النُّشُورُ",
    transliteration: "Allahümme bike asbahnâ ve bike emseynâ ve bike nahyâ ve bike nemûtü ve ileyken-nüşûr",
    meaning: "Allah'ım! Senin rahmetinle sabahladık, senin rahmetinle akşamladık. Senin sayende yaşar, senin sayende ölürüz. En son dönüşümüz de sanadır.",
    source: "Tirmizi, Daavat, 13"
  },
  {
    id: 2,
    category: "Akşam Duaları",
    title: "Akşam Duası",
    arabic: "اَللّٰهُمَّ بِكَ اَمْسَيْنَا وَبِكَ اَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَاِلَيْكَ الْمَصِيرُ",
    transliteration: "Allahümme bike emseynâ ve bike asbahnâ ve bike nahyâ ve bike nemûtü ve ileykel-masîr",
    meaning: "Allah'ım! Senin lutfunla akşamladık, senin lutfunla sabahladık. Senin sayende yaşar, senin sayende ölürüz. Dönüşümüz ancak sanadır.",
    source: "Tirmizi, Daavat, 13"
  },
  {
    id: 3,
    category: "Yemek Duaları",
    title: "Yemek Duası",
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذٖى اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمٖينَ",
    transliteration: "Elhamdü lillâhillezî at'amenâ ve sekânâ ve cealenâ minel-müslimîn",
    meaning: "Bizi yediren, içiren ve müslümanlardan kılan Allah'a hamd olsun.",
    source: "Ebu Davud, Et'ime, 52"
  },
  {
    id: 4,
    category: "Namaz Duaları",
    title: "Sübhaneke Duası",
    arabic: "سُبْحَانَكَ اللّٰهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالٰى جَدُّكَ وَلَا اِلٰهَ غَيْرُكَ",
    transliteration: "Sübhânekellâhümme ve bi hamdik ve tebârakesmük ve teâlâ ceddük ve lâ ilâhe ğayruk",
    meaning: "Allah'ım! Sen eksik sıfatlardan pak ve uzaksın. Seni daima böyle tenzih eder ve överim. Senin adın mübarektir. Varlığın her şeyden üstündür. Senden başka ilah yoktur.",
    source: "Sünen-i Ebu Davud"
  },
  {
    id: 5,
    category: "Kuran Duaları",
    title: "Rabbena Duaları",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbenâ âtinâ fid'dünyâ haseneten ve fil'âhireti haseneten ve kınâ azâben nâr",
    meaning: "Rabbimiz! Bize dünyada iyilik ver, ahirette de iyilik ver. Bizi cehennem azabından koru.",
    source: "Bakara Suresi, 201"
  },
  {
    id: 6,
    category: "Namaz Duaları",
    title: "Tahiyyat Duası",
    arabic: "اَلتَّحِيَّاتُ لِلّٰهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ اَلسَّلاَمُ عَلَيْكَ اَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ اَلسَّلاَمُ عَلَيْنَا وَعَلٰى عِبَادِ اللّٰهِ الصَّالِحٖينَ اَشْهَدُ اَنْ لاَ اِلٰهَ اِلاَّ اللّٰهُ وَاَشْهَدُ اَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    transliteration: "Ettehiyyâtü lillâhi vessalevâtü vettayyibât. Esselâmü aleyke eyyühen-nebiyyü ve rahmetullahi ve berakâtüh. Esselâmü aleynâ ve alâ ibâdillâhis-sâlihîn. Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve rasûlüh.",
    meaning: "Dil ile, beden ve mal ile yapılan bütün ibadetler Allah'a mahsustur. Ey Peygamber! Allah'ın selamı, rahmet ve bereketi senin üzerine olsun. Selam bizim üzerimize ve Allah'ın salih kulları üzerine olsun. Şahitlik ederim ki, Allah'tan başka ilah yoktur. Yine şahitlik ederim ki, Muhammed O'nun kulu ve elçisidir.",
    source: "Buhari, Ezan, 148"
  },
  {
    id: 7,
    category: "Sabah Duaları",
    title: "Güne Başlama Duası",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    transliteration: "Allahümme bike asbahna ve bike emseyna ve bike nahya ve bike nemutü ve ileyken-nüşur",
    meaning: "Allah'ım! Senin izninle sabaha çıktık, senin izninle akşama eriştik. Senin izninle yaşar, senin izninle ölürüz. Dönüş de ancak sanadır.",
    source: "Tirmizi, Deavat, 13"
  },
  {
    id: 8,
    category: "Akşam Duaları",
    title: "Yatmadan Önce Okunacak Dua",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismike Allahümme emütü ve ahya",
    meaning: "Allah'ım! Senin isminle ölür (uyur), yine senin isminle dirilirim (uyanırım).",
    source: "Buhari, Deavat, 7"
  },
  {
    id: 9,
    category: "Kuran Duaları",
    title: "İstiğfar Duası",
    arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Rabbenağfir lenâ zünûbenâ ve isrâfenâ fî emrinâ ve sebbit akdâmenâ vensurnâ alel-kavmil kâfirîn",
    meaning: "Rabbimiz! Günahlarımızı ve işimizdeki taşkınlığımızı bağışla ve (yolunda) ayaklarımızı sağlam tut ve kâfirler topluluğuna karşı bize yardım et.",
    source: "Al-i İmran Suresi, 147"
  },
  {
    id: 10,
    category: "Yemek Duaları",
    title: "Yemekten Sonra Okunacak Dua",
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذٖى اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمٖينَ",
    transliteration: "Elhamdü lillâhillezî et'amenâ ve sekânâ ve cealenâ minel-müslimîn",
    meaning: "Bizi yediren, içiren ve müslümanlardan kılan Allah'a hamd olsun.",
    source: "Ebu Davud, Et'ime, 52"
  },
  {
    id: 11,
    category: "Namaz Duaları",
    title: "Kunut Duaları",
    arabic: "اَللّٰهُمَّ اِنَّا نَسْتَعٖينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدٖيكَ وَنُؤْمِنُ بِكَ وَنَتُوبُ اِلَيْكَ وَنَتَوَكَّلُ عَلَيْكَ",
    transliteration: "Allahümme innâ nesteînüke ve nestağfiruke ve nestehdîk. Ve nü'minü bike ve netûbü ileyk. Ve netevekkelü aleyke",
    meaning: "Allah'ım! Senden yardım isteriz, günahlarımızı bağışlamanı isteriz, razı olduğun şeylere hidayet etmeni isteriz. Sana inanırız, sana tevbe ederiz. Sana güveniriz.",
    source: "Beyhaki, es-Sünenü'l-Kübra, 2/211"
  },
  {
    id: 12,
    category: "Kuran Duaları",
    title: "Ayetel Kürsi",
    arabic: "اللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْقَيُّومُۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌۚ",
    transliteration: "Allâhü lâ ilâhe illâ hüvel hayyül kayyûm. Lâ te'huzühû sinetün ve lâ nevm.",
    meaning: "Allah, kendisinden başka hiçbir ilah olmayandır. Diridir, kayyumdur. O'nu ne bir uyuklama tutabilir, ne de bir uyku.",
    source: "Bakara Suresi, 255"
  }
];

const categories = [
  "Tüm Dualar",
  "Sabah Duaları",
  "Akşam Duaları",
  "Yemek Duaları",
  "Namaz Duaları",
  "Kuran Duaları",
  "Favoriler"
];

export const fetchDuas = async () => {
  try {
    return Promise.resolve(localDuas);
  } catch (error) {
    console.error("Dualar yüklenirken hata:", error);
    throw new Error("Dualar yüklenemedi");
  }
};

export const fetchDuaCategories = async () => {
  try {
    return Promise.resolve(categories);
  } catch (error) {
    console.error("Kategoriler yüklenirken hata:", error);
    throw new Error("Kategoriler yüklenemedi");
  }
}; 