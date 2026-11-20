export type TestimonialRole =
  | "Host"
  | "Audience"
  | "Organiser"
  | "Fellow artist"
  | "Other";

export type TestimonialLang = "en" | "kn" | "de";

export interface Testimonial {
  id: string;
  name: string;
  role: TestimonialRole;
  title?: string;
  event?: string;
  city?: string;
  country: string;
  date?: string;
  text: string;
  lang: TestimonialLang;
}

export const HOME_TESTIMONIAL_IDS = [
  "janardhan-krishnappa",
  "shany-mathew",
  "chethan",
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "vasudeva-nayak-kukkundoor",
    name: "Vasudeva Nayak Kukkundoor",
    role: "Audience",
    city: "Munich",
    country: "Germany",
    lang: "en",
    text: "I have had the pleasure of following the Yakshagana performances by Yakshamitraru, led by Mr. Apoorva Beleyur and his talented friends, for the past three to four years through various cultural programs organized by Kannada groups in Munich.\n\nWhat makes their Yakshagana performances truly special is the beautiful presentation of stories from Hindu mythology, brought to life through vibrant costumes, colorful characters, expressive acting, and, above all, the wonderful use of the Kannada language. For me, this combination of mythology, traditional art, theatre, and Kannada creates a beautiful cultural experience that I thoroughly enjoy every time.\n\nMr. Beleyur, in particular, has an excellent command of Kannada, with impressive pronunciation and delivery, complemented wonderfully by his acting skills. His portrayal of the mighty Raavana in Lankadahana remains unforgettable. The energy, expressions, dialogue delivery, and sheer presence he brought to the character were simply outstanding. That performance made me an instant fan!\n\nIt is heartening to see Yakshamitraru bringing such a rich traditional art form to audiences far away from its roots. Through their performances, they are not only keeping the wonderful tradition of Yakshagana alive but also introducing our mythology and culture to new generations and helping preserve and popularize the Kannada language.\n\nI sincerely hope and wish that Mr. Beleyur and the entire Yakshamitraru team continue to perform many more such programs across the world, taking the beauty of Yakshagana, Kannada, and our cultural heritage to wider audiences while continuing their service to society.\n\n“Sarve Janāḥ Sukhino Bhavantu” — May everyone, everywhere, be happy and prosperous.",
  },
  {
    id: "josephine-ramya-antony",
    name: "Josephine Ramya Antony",
    role: "Fellow artist",
    title: "Indira Performing Arts (Yaksha Mitra 2026)",
    city: "Frankfurt",
    country: "Germany",
    lang: "en",
    text: "You don’t need a word of the language to be held by Yakshagana. The rhythm, the colour and the storytelling carry you completely — I was spellbound from the first beat to the last. Being honoured as a Yakshamitra this year meant the world to me. This is a tradition that belongs on every stage in Europe, and I wish this wonderful initiative all the very best.",
  },
  {
    id: "anoosha-n-shastry",
    name: "Dr. Anoosha N. Shastry",
    role: "Fellow artist",
    title:
      "Ayurveda Physician (BAMS, RGUHS - India), Bharatanatyam Artist; Founder & Director, Sanatana Akademie",
    city: "Munich",
    country: "Germany",
    lang: "en",
    text: "Watching Yakshamitraru Germany has always meant more to me than simply watching a Yakshagana performance in Germany. Living and working with Indian knowledge traditions away from India, I know how delicate the balance is between making a tradition accessible to a new audience and allowing it to remain unmistakably itself. This is something I deeply appreciate in the work of Yakshamitraru Germany.\n\nWhat stands out in their performances is how completely they bring the world of Yakshagana onto the stage. The music, costumes, movement, dialogue, storytelling and unmistakable energy of the art form come together without being diluted for a different audience. For those of us who know Yakshagana, there is an immediate familiarity and connection to home; for someone encountering it for the first time, it is an opportunity to experience the richness and character of the tradition in its authentic form.\n\nPerhaps that is what I value most about their work: they are not only taking Yakshagana to new stages, they are allowing Yakshagana to travel while retaining its authentic identity.\n\nMy heartfelt appreciation to Apurva ji and the entire team of Yakshamitraru Germany for the dedication, conviction and immense effort behind each performance, and for continuing to give this treasured art form the space, respect and visibility it deserves.",
  },
  {
    id: "janardhan-krishnappa",
    name: "Janardhan Krishnappa",
    role: "Audience",
    city: "Dortmund",
    country: "Germany",
    lang: "en",
    text: "Yakshagana is one of Karnataka’s finest and most vibrant art forms, carrying a rich cultural legacy. It is truly inspiring to see Yakshamitraru Germany preserving this heritage on foreign soil with such passion and dedication. Their energetic performances and captivating storytelling leave audiences amazed and spellbound. A wonderful effort to keep Karnataka’s rich Yakshagana tradition alive for generations to come 🙏",
  },
  {
    id: "bala-nagaraj",
    name: "Bala Nagaraj",
    role: "Fellow artist",
    title: "Musician, Indian Octaves Music School",
    city: "Frankfurt",
    country: "Germany",
    lang: "en",
    text: "Preserving our cultural heritage is about making timeless Indian stories resonate across cultures in a way that is engaging, colorful, and profound.\n\nThrough the ancient art of Yakshagana, Apoorva and the Yakshamitraru team bring these epics to life beautifully for European audiences.\n\nI warmly congratulate them not just for their mesmerizing performances, but for the genuine humility and respect they show in honoring local artists.",
  },
  {
    id: "satish-palled",
    name: "Satish Palled",
    role: "Host",
    title: "Board of Director, Poland Kannadigaru Association",
    country: "Poland",
    lang: "en",
    text: "It was an honor to invite the Yakshamitraru team from Germany to Poland for our Karnataka Rajyotsava celebrations, their first-ever performance outside Germany. The audience, drawn from across India, was captivated by this unique art form from Karnataka; even those unfamiliar with the language were deeply moved and gave thunderous applause. Every performer shone with skill and passion.\n\nThe event was graced by dignitaries from Karnataka, educationists, police commissioners, industrialists, and the Honorary Consul of the Republic of Poland.\n\nHeartfelt thanks to the Yakshamitraru team from Germany for this unforgettable cultural evening.",
  },
  {
    id: "team-purva-nrw",
    name: "Team Purva",
    role: "Host",
    title: "NRW Kannadigara Balaga",
    city: "Dortmund",
    country: "Germany",
    lang: "en",
    text: "Spellbinding , Captivating and Electrifying. Watching them perform live in Dortmund was our privilege",
  },
  {
    id: "parashiva-murthy",
    name: "Parashiva murthy",
    role: "Audience",
    title: "Advanced manufacturing manager, Schleich GmbH",
    city: "Cologne",
    country: "Germany",
    lang: "en",
    text: "Yakshamitraru turned every performance into a mesmerising journey, telling timeless stories through breathtaking expressions, intricate movements, and soulful artistry. Their captivating presence held every audience spellbound, creating a truly unforgettable experience that beautifully bridged cultures and touched hearts across Europe.",
  },
  {
    id: "belaku-chitra-nataka",
    name: "Belaku Chitra Nataka",
    role: "Fellow artist",
    city: "Berlin",
    country: "Germany",
    lang: "en",
    text: "We at Belaku Chitra Nataka have been collaborating regularly with Yakshamitraru e. V and we must say that they are doing a truly commendable job in keeping the traditional art form of Yakshagana alive in Germany. They are also absolutely humble and extremely talented bunch of people to work with.",
  },
  {
    id: "sandhya-hegde",
    name: "Dr. Sandhya Hegde",
    role: "Audience",
    city: "Hannover",
    country: "Germany",
    lang: "en",
    text: "Yakshagana has always held a special place in my heart, having grown up in a place where this magnificent art form is deeply rooted. After moving to Germany, my first encounter with Yakshamitraru was during their performance about five years ago, and I was completely mesmerized. Ever since, I have been a huge admirer of Yakshamitraru—their performances are so captivating that, when they are on stage, I become completely immersed and forget the world around me. It is truly a joy and a privilege to experience their Yakshagana performances.",
  },
  {
    id: "chethan",
    name: "Chethan",
    role: "Audience",
    city: "Barcelona",
    country: "Spain",
    lang: "kn",
    text: "ಸ್ಪೇನ್ ಕನ್ನಡ ಕೂಟದ ರಾಜ್ಯೋತ್ಸವ ವಿಶೇಷ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ 'ಯಕ್ಷ ಮಿತ್ರರು' ತಂಡವು ಪ್ರಸ್ತುತಪಡಿಸಿದ ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನವು ಕರಾವಳಿ ಕರ್ನಾಟಕದ ಭವ್ಯ ಕಲಾಪರಂಪರೆಯನ್ನು ವಿದೇಶದ ಮಣ್ಣಿನಲ್ಲಿ ಅತ್ಯಂತ ಯಶಸ್ವಿಯಾಗಿ ಎತ್ತಿಹಿಡಿಯಿತು. ಕರಾವಳಿಯ ವಿಶಿಷ್ಟ ರಂಗಕಲೆಯಾದ ಯಕ್ಷಗಾನದ ಪೌರಾಣಿಕ ವೈಭವ, ವರ್ಣರಂಜಿತ ವೇಷಭೂಷಣ, ಪ್ರಭಾವಶಾಲಿ ಸಾಂಪ್ರದಾಯಿಕ ಮುಖವರ್ಣಿಕೆ ಮತ್ತು ಕಲಾವಿದರ ಶಕ್ತಿಶಾಲಿ ಅಭಿನಯದ ಮೂಲಕ ತಂಡವು ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ಗರಿಮೆಯನ್ನು ಸುಂದರವಾಗಿ ಅನಾವರಣಗೊಳಿಸಿತು. ರಂಗಸ್ಥಳದ ಮೇಲಿನ ಕಲಾವಿದರ ಶಿಸ್ತು, ಚುರುಕಿನ ನೃತ್ಯ ಹಾಗೂ ಕಲಾತ್ಮಕ ಹಾವಭಾವಗಳು ವೀಕ್ಷಕರನ್ನು ಕರಾವಳಿಯ ಸಾಂಸ್ಕೃತಿಕ ಲೋಕಕ್ಕೆ ನೇರವಾಗಿ ಕರೆದೊಯ್ದವು.\n\nವಿದೇಶದಲ್ಲಿ ನೆಲೆಸಿರುವ ಕನ್ನಡಿಗರಿಗೆ ತಮ್ಮ ತಾಯ್ನಾಡಿನ ಪರಂಪರೆಯನ್ನು ನೆನಪಿಸುವ ಮತ್ತು ಕರಾವಳಿಯ ಕಲಾ ಸಿರಿವಂತಿಕೆಯನ್ನು ಎತ್ತಿ ಹಿಡಿಯುವಲ್ಲಿ 'ಯಕ್ಷ ಮಿತ್ರರು' ನಿಜವಾದ ಸಾಂಸ್ಕೃತಿಕ ರಾಯಭಾರಿಗಳಾಗಿ ಕಂಗೊಳಿಸಿದರು. ಈ ಪ್ರದರ್ಶನವು ಕೇವಲ ಒಂದು ಕಲಾ ಸೇವೆಯಾಗಿರದೆ, ಸಮಸ್ತ ಕರ್ನಾಟಕದ ವೈಭವವನ್ನು ಸ್ಪೇನ್ನಲ್ಲಿ ಪ್ರತಿನಿಧಿಸಿದ ಹೆಮ್ಮೆಯ ಕ್ಷಣವಾಗಿತ್ತು. ತಂಡದ ಅಪಾರ ಶ್ರದ್ಧೆ ಹಾಗೂ ಕಲಾಪ್ರೀತಿಯು ಸ್ಪೇನ್ ಕನ್ನಡ ಕೂಟದ ರಾಜ್ಯೋತ್ಸವ ಆಚರಣೆಗೆ ವಿಶೇಷ ಮೆರುಗು ನೀಡಿ, ಪ್ರೇಕ್ಷಕರ ಮನದಲ್ಲಿ ದೀರ್ಘಕಾಲ ಉಳಿಯುವಂತಹ ಅದ್ಭುತ ಸಾಂಪ್ರದಾಯಿಕ ಅನುಭವವನ್ನು ನೀಡಿತು.",
  },
  {
    id: "mahesh-nag",
    name: "Mahesh Nag",
    role: "Host",
    title: "Member, Donau Karunada Balaga",
    city: "Regensburg",
    country: "Germany",
    lang: "en",
    text: "We had the privilege of bringing Yakshagana to Regensburg for the first time with Yakshamitraru — the way they captivated our audience, Indian and German, kids and adults alike, for several hours still feels surreal.\n\nMost of them had never seen this art form before.\n\nWhat strikes us most is the love, commitment, and passion the team bring to this art — and especially their non-commoditising mindset. That’s what wins any true art lover’s heart.",
  },
  {
    id: "chandrashekar-venkataramappa",
    name: "Chandrashekar Venkataramappa",
    role: "Host",
    title: "President, France Kannada Balaga",
    country: "France",
    lang: "en",
    text: "The 2021 FKB Rajyotsava event was a truly remarkable celebration, featuring the first-ever group performance of Yakshagana in Paris with exceptional energy, authenticity, and artistry.\n\nIt was also a special milestone for Yakshammitraru—their maiden tour outside Germany—making the performance an unforgettable celebration of Yakshagana, cultural heritage, and international camaraderie.",
  },
  {
    id: "shany-mathew",
    name: "Shany Mathew",
    role: "Fellow artist",
    title:
      "Direktorin und Choreografin, Nisari Kalakshetra Deutschland; Bundesvorstand, Deutsch Indische Gesellschaften (DIG e.V.)",
    country: "Germany",
    lang: "de",
    text: "Magie auf der Bühne: „Mein Dank an das Ensemble von YakshaMitraru Germany e.V!“\n\nMeine herzlichsten Glückwünsche an das wunderbare Team des Yakshamitraru Germany e.V. für Ihre großartigen, lebendigen Kunst-Werke! Sie leisten einen unschätzbaren Beitrag, der weit über das reine Sichtbarmachen dieses reichen Erbes hinausgeht. Durch Ihr Wirken öffnen Sie eine Tür für neugierige Entdecker, die diesen Kulturschatz zum ersten Mal im Herzen berührt.\n\nIch hatte bereits das große Glück, Ihr Ensemble Frankfurt live zu erleben. In jedem Augenblick, in jeder Geste spürt man, dass alle Künstler mit Leib und Seele für diese jahrhundertealte Kunst brennen.\n\nDie Kombination aus Musik, farbenprächtigen Kostümen und ausdrucksstarkem Schauspiel schlägt eine Brücke zwischen den Kulturen. Die Welt der indischen Mythologie wird hierdurch für uns lebendig und greifbar gemacht – eine magische Reise, für die man sonst Kontinente überqueren müsste.\n\nIch wünsche dem gesamten Ensemble von ganzem Herzen Alles Gute, weiterhin viel Erfolg und dass Ihr inneres Feuer noch viele Menschen verzaubert!\n\nMit den besten Grüßen",
  },
  {
    id: "ranjith-kumar-haridas",
    name: "Ranjith Kumar Haridas",
    role: "Host",
    country: "Denmark",
    lang: "en",
    text: "Apoorva and the Yakshamitraru team have a remarkable way of bringing the richness, energy, and tradition of Yakshagana to audiences far from its roots in Karnataka. We had the pleasure of hosting them in Denmark as part of Denmark Kannada Koota’s 10-year anniversary celebration, and their performance was truly one of the highlights of the occasion.\n\nWhat stood out was not only the powerful performance, vibrant costumes, music, and storytelling, but also the passion and dedication with which Apoorva and his team represent this beautiful art form. Their ability to connect with audiences across cultures while preserving the authenticity of Yakshagana is something very special.\n\nIt was a wonderful experience having Yakshamitraru perform in Denmark, and I sincerely appreciate Apoorva and the entire team for their efforts in taking Yakshagana to an international audience and keeping our cultural heritage alive.",
  },
];
