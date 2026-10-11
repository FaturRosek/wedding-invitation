const WEDDING_CONFIG = {
  couple: {
    bride: {
      fullName: "Siti Rohmah",
      nickName: "Rohmah",
      gender: "Wanita",
      childOrder: "Putri tercinta",
      father: "Bapak [Nama Ayah]",
      mother: "Ibu [Nama Ibu]",
      parentsText: "Putri tercinta dari Bapak [Nama Ayah] & Ibu [Nama Ibu]",
      instagram: "@siti.rohmah",
      photo: "assets/images/bride-profile.jpeg",
      bio: "Sosok wanita yang hangat dan penuh kelembutan, siap melangkah dalam ikatan suci mengarungi bahtera rumah tangga.",
    },
    groom: {
      fullName: "Mohammad Syakroni",
      nickName: "Syakroni",
      gender: "Pria",
      childOrder: "Putra tercinta",
      father: "Bapak [Nama Ayah]",
      mother: "Ibu [Nama Ibu]",
      parentsText: "Putra tercinta dari Bapak [Nama Ayah] & Ibu [Nama Ibu]",
      instagram: "@m.syakroni",
      photo: "assets/images/groom-profile.jpeg",
      bio: "Pria bertanggung jawab dan penuh keteguhan hati yang memantapkan langkah menjemput separuh agamanya.",
    },
    mainPhoto: "assets/images/couple-main.jpeg",
    monogram: "SR",
    hashtag: "#RohmahSyakroni2027",
  },
  event: {
    day: "Kamis",
    date: "8 April 2027",
    year: 2027,
    timezone: "Asia/Jakarta (WIB)",
    countdownTargetISO: "2027-04-08T07:00:00+07:00",
    akad: {
      name: "Akad Nikah",
      dayDate: "Kamis, 8 April 2027",
      time: "07.00 WIB - Selesai",
      locationName: "Kediaman Mempelai Wanita",
      address: "Pengarangan, Tengket, Arosbaya, Bangkalan, Jawa Timur",
      badge: "Sakral & Khidmat",
    },
    resepsi: {
      name: "Resepsi Pernikahan",
      dayDate: "Kamis, 8 April 2027",
      time: "13.00 WIB - Selesai",
      locationName: "Kediaman Mempelai Wanita",
      address: "Pengarangan, Tengket, Arosbaya, Bangkalan, Jawa Timur",
      badge: "Tasyakuran & Ramah Tamah",
    },
  },
  location: {
    venueName: "Pengarangan, Arosbaya",
    addressSummary:
      "Pengarangan, Tengket, Kec. Arosbaya, Kab. Bangkalan, Jawa Timur",
    fullAddress:
      "Pengarangan, Tengket, Kec. Arosbaya, Kabupaten Bangkalan, Jawa Timur",
    coordinates: {
      lat: -6.946094,
      lng: 112.836435,
    },
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3960.5345362740304!2d112.836435!3d-6.946094!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd8118b7bd304a3%3A0x4881a83eaf910134!2sBupanjang%2C%20Tengket%2C%20Kec.%20Arosbaya%2C%20Kabupaten%20Bangkalan%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1791709659836!5m2!1sid!2sid",
    directionUrl: "https://maps.app.goo.gl/8NmeH58ABqQvR7hK8",
  },
  loveStory: [
    {
      year: "2024",
      title: "Pertemuan Pertama",
      content:
        "Takdir mempertemukan kami dalam sebuah jalinan silaturahmi yang penuh kesederhanaan. Dari percakapan singkat bersemi niat baik dan saling mengenal pribadi masing-masing.",
      icon: "sparkles",
    },
    {
      year: "2025",
      title: "Mempererat Komitmen",
      content:
        "Dengan doa dan restu dari kedua keluarga tercinta, kami memantapkan hati untuk saling melengkapi dan menyatukan visi hidup dalam komitmen yang lebih serius.",
      icon: "rings",
    },
    {
      year: "2027",
      title: "Menuju Ikatan Suci",
      content:
        "Insya Allah, pada hari Kamis, 8 April 2027, kami mengikrarkan janji suci pernikahan untuk mengarungi bahtera rumah tangga yang sakinah, mawaddah, warahmah.",
      icon: "heart",
    },
  ],
  gallery: [
    {
      src: "assets/images/gallery/1.jpeg",
      title: "Harmoni Cinta",
      caption: "Langkah awal menyatukan dua hati dalam satu ikrar suci.",
    },
    {
      src: "assets/images/gallery/2.jpeg",
      title: "Senyum Bahagia",
      caption:
        "Bersyukur atas setiap detik perjalanan yang telah dilalui bersama.",
    },
    {
      src: "assets/images/gallery/3.jpeg",
      title: "Janji Kebersamaan",
      caption: "Saling mendukung dan menguatkan di setiap fase kehidupan.",
    },
    {
      src: "assets/images/gallery/4.jpeg",
      title: "Doa & Harapan",
      caption: "Menatap masa depan dengan keyakinan dan ridha Ilahi.",
    },
    {
      src: "assets/images/gallery/5.jpeg",
      title: "Kasih & Ketulusan",
      caption: "Dua insan dipertemukan untuk saling menyempurnakan ibadah.",
    },
    {
      src: "assets/images/gallery/6.jpeg",
      title: "Menuju Hari Bahagia",
      caption:
        "Menanti kehadiran Bapak/Ibu/Saudara/i untuk merayakan momen berharga ini.",
    },
  ],
  audio: {
    title: "Wedding Instrumental - Canon in D",
    src: "assets/audio/wedding-song.mp3",
    fallbackSrc: "assets/audio/wedding-song.wav",
  },
  rsvp: {
    maxGuests: 5,
    defaultStatus: "hadir",
    netlifyFormName: "rsvp",
    storageKey: "wedding_rsvp_rohmah_syakroni",
  },
  wishes: {
    maxChars: 500,
    netlifyFormName: "wishes",
    storageKey: "wedding_wishes_rohmah_syakroni",
    initialWishes: [
      {
        name: "Keluarga Besar",
        relation: "Keluarga",
        attendance: "hadir",
        message:
          "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Selamat untuk Rohmah & Syakroni, semoga menjadi keluarga sakinah mawaddah warahmah.",
        time: "Beberapa saat lalu",
      },
      {
        name: "Nur Azizah Putri",
        relation: "Saudara",
        attendance: "hadir",
        message:
          "Selamat menempuh hidup baru sahabatku Syakroni & Rohmah! Semoga selalu dipenuhi kebahagiaan dan keberkahan sampai maut memisahkan.",
        time: "Hari ini",
      },
      {
        name: "Ustadz Mansyur",
        relation: "Kerabat",
        attendance: "hadir",
        message:
          "Semoga Allah senantiasa melimpahkan taufiq, hidayah, dan kelapangan rezeki untuk kedua mempelai dalam mengarungi biduk rumah tangga.",
        time: "Kemarin",
      },
    ],
  },
  digitalGift: {
    enabled: true,
    accounts: [
      {
        bank: "BCA",
        accountNumber: "1234567890",
        accountName: "Siti Rohmah",
        logo: "bca",
      },
      {
        bank: "BRI",
        accountNumber: "098765432109876",
        accountName: "Mohammad Syakroni",
        logo: "bri",
      },
    ],
    giftAddress: {
      recipient: "Siti Rohmah / Mohammad Syakroni",
      phone: "+62 812-XXXX-XXXX",
      address: "Pengarangan, Kec. Arosbaya, Kab. Bangkalan, Jawa Timur 69151",
    },
  },
  copywriting: {
    greetingArabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم",
    greetingTitle: "Assalamu’alaikum Warahmatullahi Wabarakatuh",
    greetingBody:
      "Dengan memohon rahmat dan ridha Allah Subhanahu Wa Ta'ala, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra-putri kami:",
    quranVerse:
      "“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.”",
    quranSurah: "QS. Ar-Rum: 21",
    closingPrayer:
      "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.",
    closingThanks:
      "Atas kehadiran dan doa restu yang diberikan, kami sekeluarga mengucapkan terima kasih yang sebesar-besarnya.",
    closingWassalam: "Wassalamu’alaikum Warahmatullahi Wabarakatuh",
  },
};
if (typeof Object.freeze === "function") {
  Object.freeze(WEDDING_CONFIG);
}
