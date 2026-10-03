'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, Download } from 'lucide-react'
import { 
  GiDaemonSkull, GiCrossbow, GiDungeonGate, 
  GiHarp, GiMagicSwirl, GiSoundWaves, GiTreasureMap,
  GiSkeletalHand, GiPistolGun, GiFireBowl, GiHammerDrop, GiBookAura
, GiBroadsword
} from 'react-icons/gi'

const PATCHES = [
  {
    id: 'v1.4',
    title: 'YAMA 1.4',
    subtitle: 'Mystic Abyss II 🔥',
    date: 'EN YENİ GÜNCELLEME',
    mandatory: true,
    intro: 'Uçurum artık çok daha acımasız ve rekabetçi. Yeni seçkin yetenekleri, donmuş diyarlar ve küresel liderlik tablosuyla Mystic Abyss II yepyeni bir boyuta taşınıyor!',
    sections: [
      {
        id: 'v1.4-dusmanlar',
        title: 'SEÇKİN DÜŞMANLAR VE SAVAŞ 💀',
        icon: GiDaemonSkull,
        color: 'text-red-500',
        items: [
          '<strong class="text-[#e8d5b0]">Nitelikli Seçkinler:</strong> Seçkin düşmanlar artık özel niteliklerle doğuyor: <span class="italic text-[#c0392b]">Ateşli, Hızlı, Kalkanlı, Çağırıcı, Vampir, Işınlanan, Dondurucu.</span>',
          '<strong class="text-[#e8d5b0]">Son Anlar Ekranı:</strong> Öldüğünüzde karşınıza yepyeni bir ekran çıkar. Sizi tam olarak neyin öldürdüğünü, ne kadar hasar aldığınızı gösterir ve hayatta kalmanız için ipuçları verir.',
          '<strong class="text-[#e8d5b0]">Ping Sistemi:</strong> Orta tık veya (Z) tuşuna basarak bulunduğunuz yeri veya tehlikeleri takım arkadaşlarınıza işaretleyebilirsiniz.'
        ]
      },
      {
        id: 'v1.4-odalar',
        title: 'YENİ ODA OLAYLARI VE ARENA 🌋',
        icon: GiDungeonGate,
        color: 'text-orange-500',
        items: [
          '<strong class="text-[#e8d5b0]">Oda Olayları:</strong> Odalara girdiğinizde rastgele gerçekleşebilecek yepyeni olaylar eklendi: <span class="italic">Kuşatma Odası, Zifiri Karanlık Oda, Kan Sunağı ve yakalaması zor Hazine Goblini!</span>',
          '<strong class="text-[#e8d5b0]">Ateşli Arena:</strong> Muhafız arenaları artık savaşın 2. evresine geçildiğinde alev alev yanmaya başlıyor.'
        ]
      },
      {
        id: 'v1.4-icerikler',
        title: 'EŞYALAR VE YENİ BÖLGELER ❄️',
        icon: GiMagicSwirl,
        color: 'text-blue-300',
        items: [
          '<strong class="text-[#e8d5b0]">Yeni Yuvalar:</strong> Karakterinize güç katacak <b>Yüzük</b> ve <b>Muska</b> (Amulet) takma yuvaları eklendi.',
          '<strong class="text-[#e8d5b0]">Donmuş Taht:</strong> Sonsuz Uçurum moduna yepyeni ve dondurucu bir bölge eklendi. En derinde ise yeni muhafız <b>Donmuş Kral</b> sizi bekliyor.'
        ]
      },
      {
        id: 'v1.4-diger',
        title: 'REKABET VE KÜRESEL 🌍',
        icon: GiTreasureMap,
        color: 'text-green-400',
        items: [
          '<strong class="text-[#e8d5b0]">Liderlik Tablosu:</strong> Artık hem oyun içinde hem de sitemizde kimin uçurumun en derinlerine indiğini gösteren bir Liderlik Tablosu var! Ayrıca <b>Haftalık Meydan Okumalar</b> ile sınırlarınızı zorlayın.',
          '<strong class="text-[#e8d5b0]">İngilizce Dil Desteği:</strong> Oyun artık resmi olarak İngilizce dilini de destekliyor! (English language support!)'
        ]
      }
    ]
  },
  {
    id: 'v1.3',
    title: 'YAMA 1.3',
    subtitle: 'Mystic Abyss II Online 💀',
    date: 'Geçmiş Güncelleme',
    mandatory: true,
    intro: 'Karanlık giderek yoğunlaşıyor. Korozyon zihinleri daha hızlı çürütüyor, uçurumun diplerinden daha önce hiç görülmemiş kabuslar yüzeye çıkıyor. Hayatta kalmak artık sadece bir umut...',
    sections: [
      {
        id: 'v1.3-zorluk',
        title: 'OYUN ZORLAŞTI',
        icon: GiDaemonSkull,
        color: 'text-red-500',
        items: [
          '<strong class="text-[#e8d5b0]">Düşmanlar Güçlendi:</strong> Daha dayanıklı, daha sert ve daha hızlı. Odalar artık çok daha kalabalık ve seçkin (elite) düşmanlar daha sık beliriyor.',
          '<strong class="text-[#e8d5b0]">Korozyon Tehlikesi:</strong> Korozyon artık çok daha hızlı birikiyor. Ayrıca ara ara ölümcül <span class="text-red-400">uçurum dalgaları</span> geliyor.',
          '<strong class="text-[#e8d5b0]">İksir Sınırı:</strong> Her iksir türünden maksimum 2 adet ile başlarsınız. Her 3 seviyede bir sınır +1 artar.'
        ]
      },
      {
        id: 'v1.3-dusmanlar',
        title: 'YENİ DÜŞMANLAR',
        icon: GiCrossbow,
        color: 'text-[#a89070]',
        cards: [
          { title: '🏹 Kemik Okçu', desc: 'Uzaktan oldukça hızlı ok atar. Seçkin (Elite) versiyonu üçlü yaylım ateşi yapar.' },
          { title: '🛡️ Mezar Şövalyesi', desc: 'Sahip olduğu dev kalkan önden gelen vuruşları keser. Sadece arkasından vurarak hasar verebilirsiniz.' },
          { title: '🧪 Şişkin Ceset', desc: 'Öldüğü anda zehirli bir patlama yaratır. Yaklaşmadan uzaktan öldürmeniz tavsiye edilir.' },
          { title: '🔥 Ateş İmpi', desc: 'Havada uçarak sürekli üstünüze ateş topları fırlatan sinir bozucu yaratıklar.' },
          { title: '👀 Gölge Avcısı', desc: 'Neredeyse tamamen görünmezdir ve aniden tam arkanızda belirerek saldırır. Sürekli arkanızı kollayın.', span: true }
        ]
      },
      {
        id: 'v1.3-diger',
        title: 'DİĞER GÜNCELLEMELER',
        icon: GiDungeonGate,
        color: 'text-blue-400',
        items: [
          'Artık göl ve çukurların üzerinden ateş edilebiliyor.',
          'Yepyeni <b>Sade Arayüz</b> seçeneği eklendi. (Eski arayüze geçmek için: Ayarlar > Ayrıntılı arayüz).',
          'Her oda türünün (Zindan, Mağara, vb.) artık kendine has özel duvar tasarımları var.',
          'Oyuna harika bir atmosfer katan <b>Yeni Ortam Sesleri</b> eklendi: <span class="italic text-[#a89070]">Çan, ilahi, sıçanlar, su, lav, müzik kutusu…</span>'
        ]
      }
    ]
  },
  {
    id: 'v1.2.1',
    title: 'YAMA 1.2.1',
    subtitle: 'Mystic Abyss II Online 🎸',
    date: 'Önceki Güncelleme',
    mandatory: true,
    intro: 'Ozan sınıfı baştan aşağı yenilendi. Müzik ruhun gıdasıdır derler, ama bu notalar düşmanların ruhunu bedeninden söküp alacak...',
    sections: [
      {
        id: 'v1.2.1-ozan',
        title: 'OZAN BAŞTAN',
        icon: GiHarp,
        color: 'text-purple-400',
        items: [
          '<strong class="text-[#e8d5b0]">Q - Ezgi Notaları:</strong> Renk renk notalar düşmanlara kıvrılarak uçar, çarpınca patlar.',
          '<strong class="text-[#e8d5b0]">K Geliştirmeleri:</strong> +2 nota, +2 nota ve hız, %60 hasar + ses patlaması, seken nota seçenekleri eklendi.',
          '<strong class="text-[#e8d5b0]">E - Savaş Marşı:</strong> 15 sn boyunca sen ve yakındaki dostlar +%15 hasar kazanır, -%15 daha az hasar alırsınız. (25 sn bekleme süresi).',
          '<strong class="text-[#e8d5b0]">R - Metal Destan:</strong> Distorsiyonlu metal riffi çalar. Takımdaki herkes 5 sn boyunca HİÇ HASAR ALMAZ! 🤘'
        ]
      },
      {
        id: 'v1.2.1-nekromant',
        title: 'NEKROMANT',
        icon: GiMagicSwirl,
        color: 'text-green-500',
        items: [
          'Çağrılan ölüler artık duvarın içinde sıkışıp kalmıyor, duvarın önünde düzgünce beliriyor.',
          'Tırpan artık Azrail gibi dik tutuluyor; birinci şahıs (FPS) kamerasında iki elle, çok daha geniş ve acımasız bir yayla savruluyor.'
        ]
      },
      {
        id: 'v1.2.1-muzik',
        title: 'MÜZİK',
        icon: GiSoundWaves,
        color: 'text-yellow-400',
        items: [
          'Müzik geçişleri çok daha yumuşak hale getirildi. Bir parça en az 50 saniye çalmadan diğeri başlamayacak.',
          'Parçalar artık iki kat daha uzun: İkinci tur uzaktan gelir gibi boğuk başlıyor ve giderek açılıyor.',
          'Zorlu odanın bozulma (distortion) efekti artık aniden değil, yavaşça ve gerilim yaratarak geliyor.'
        ]
      },
      {
        id: 'v1.2.1-harita',
        title: 'HARİTA VE DÜZELTMELER',
        icon: GiTreasureMap,
        color: 'text-gray-400',
        items: [
          'Teras korkulukları ve galeri köşeleri artık birbirine girmiyor (clipping düzeltildi).',
          'Sıra, tezgâh, parmaklık, lahit, kitaplık ve taht gibi objelerin birbirine veya duvara girmesi engellendi.',
          'Tavan kirişleri, zincirler, sarkıtlar ve devasa kökler artık yüksek salonlarda havada asılı kalmıyor, fizik kurallarına uyuyor.'
        ]
      }
    ]
  }
,
  {
    id: 'v1.2',
    title: 'YAMA 1.2',
    subtitle: 'Mystic Abyss II Online 💀',
    date: 'Geçmiş Güncelleme',
    mandatory: false,
    intro: 'Ölüm artık bir son değil, sadece bir başlangıç. Nekromant uçurumun karanlık güçlerini kontrol etmek için uyandı. Muhafızlar eskisinden çok daha acımasız ve korkutucu...',
    sections: [
      {
        id: 'v1.2-nekromant',
        title: 'YENİ SINIF: NEKROMANT',
        icon: GiSkeletalHand,
        color: 'text-green-500',
        items: [
          '<strong class="text-[#e8d5b0]">Kanlı Tırpan:</strong> Düşmanları tırpanla biçer, her isabetli vuruş size can verir.',
          '<strong class="text-[#e8d5b0]">Q - Kemik Ordusu:</strong> Cesetlerden iskelet askerler kaldırır.',
          '<strong class="text-[#e8d5b0]">E - Ceset Patlaması:</strong> Yerdeki cesetleri patlatarak alan hasarı verir.',
          '<strong class="text-[#e8d5b0]">R - Ölüler Ordusu (Ulti):</strong> Çevrenize 6 iskelet ve devasa bir Kemik Golemi çağırır!'
        ]
      },
      {
        id: 'v1.2-siniflar',
        title: 'SINIF GÜNCELLEMELERİ',
        icon: GiPistolGun,
        color: 'text-[#a89070]',
        items: [
          '<strong class="text-[#c0392b]">Silahşör:</strong> Altıpatlar baştan yapıldı, birinci şahısta düzgün görünüyor. 7 mermi alır ve kendiliğinden dolar. Havada vurulan bomba elementini saçar. Yeni ulti <b>Ölüm Gözü:</b> Hedefleri işaretle, sırayla kafadan vur!',
          '<strong class="text-[#e8d5b0]">Ozan:</strong> Saz artık gerçek saz gibi tutuluyor.',
          '<strong class="text-[#e8d5b0]">Paladin:</strong> Q bekleme süresi 6→4 sn, E bekleme süresi 12→9 sn.'
        ]
      },
      {
        id: 'v1.2-muhafizlar',
        title: 'MUHAFIZLAR (BOSSLAR)',
        icon: GiDaemonSkull,
        color: 'text-red-500',
        items: [
          'Hepsi tamamen şeytani yaratıklar olarak baştan tasarlandı.',
          'Canları yaklaşık <b>3,5 kat</b> artırıldı ve evre geçişinde kısa dokunulmazlık kazandılar.',
          'Uzaktan oynayan oyuncuları zincirle/büyüyle çeker, üstüne atlar ve ölümcül mermi sarmalı açarlar.',
          'Golem ve Kasap muhafızları artık üzerinize devasa kayalar fırlatıyor ve amansızca hücum ediyor.',
          '<strong class="text-[#c0392b]">Gizli Muhafızlar:</strong> Baphomet, Mefisto, Lucifer, Şeytan... Onlarla yüzleşmenin koşullarını bulmak size kalmış 👀'
        ]
      },
      {
        id: 'v1.2-mekanikler',
        title: 'YENİ MEKANİKLER',
        icon: GiFireBowl,
        color: 'text-orange-500',
        items: [
          '<strong class="text-[#c0392b]">Yedi Ölümcül Günah:</strong> Mini muhafız odasına girince kapılar kilitlenir. Eğer yenerseniz ödül alır ve <b>Şeytanla Anlaşma</b> (kalıcı can karşılığı efsanevi ganimet) yapabilirsiniz.',
          '<strong class="text-[#e8d5b0]">Zorlu Odalar:</strong> Daha güçlü düşmanlar ve bozuk müzik barındırır, temizleyince devasa ödüller verir.',
          '<strong class="text-[#e8d5b0]">Korozyon Yenilendi:</strong> Korozyon artık çok önemli. Daha hızlı birikir. Evreler ilerledikçe hasar, kritik, altın ve ganimet şansınız artar. 100 seviyesine ulaştığınızda <b>Uçurum Formuna</b> dönüşürsünüz!'
        ]
      },
      {
        id: 'v1.2-modeller',
        title: 'MODELLER VE PERFORMANS',
        icon: GiHammerDrop,
        color: 'text-gray-400',
        items: [
          'Kasap, Golem, İğrenç, Hortlak, Mimik, Balçık, Gulyabani ve Emekleyen Ceset tamamen yeniden modellendi.',
          'Sandık, tüccar, sunak, pınar, kürsü, merdiven ve küplerin grafikleri yeniden yapıldı.',
          'Mimik artık gerçek sandıktan kesinlikle ayırt edilemiyor, her açtığınız sandıkta tetikte olun.',
          '<b>Performans:</b> Aynı tür düşmanlar artık model paylaşımı yapıyor. Bu sayede düşman başına ~%70 daha az bellek tüketimi sağlandı!'
        ]
      },
      {
        id: 'v1.2-diger',
        title: 'DİĞER ÖZELLİKLER',
        icon: GiTreasureMap,
        color: 'text-blue-400',
        items: [
          'Eski nesil <b>Diablo tarzı yarı saydam harita</b> (M) eklendi.',
          'Yüksek salonlarda artık yürünebilir üst katlar, taş köprüler ve merdivenler var.',
          'Diken tuzakları artık odaya girdiğiniz anda aktifleşiyor ve uyanıyor.',
          'Müzik odadan odaya atmosfere göre değişiyor.',
          'Silahınızı <b>(X)</b> tuşuyla eritebilir veya tüccara satabilirsiniz.',
          '<b>Çoklu Kayıt Sistemi:</b> Artık her sınıfın kendine ait ayrı bir ilerleme kaydı var.',
          '10+ yepyeni başarım eklendi.'
        ]
      }
    ]
  }
,

  {
    id: 'v1.1',
    title: 'YAMA 1.1',
    subtitle: 'Mystic Abyss II Online 🔫📖',
    date: 'Eski Güncelleme',
    mandatory: true,
    intro: 'Barut kokusu ve kara büyü... Silahşör\'ün altıpatları uçurumu inletirken, Cinci\'nin cehennemden çağırdığı iblisler düşmanlara kan kusturacak!',
    sections: [
      {
        id: 'v1.1-silahsor',
        title: 'YENİ SINIF: SİLAHŞÖR',
        icon: GiPistolGun,
        color: 'text-yellow-600',
        items: [
          '<strong class="text-[#e8d5b0]">Altıpatlar:</strong> Sol tık anında isabet sağlar (hitscan). Sağ tık basılı tut-bırak ile delici ağır atış yapar.',
          '<strong class="text-[#e8d5b0]">Q - Talih Sikkesi:</strong> Havaya bir sikke atarsınız. Havadayken (G) ile yumruklarsanız sikke hedefe kilitlenip herkesi deler. Yumruklamazsanız yere düşünce kör edici bir parıltı patlatır ve çevredeki tüm düşmanları 1,5 sn sersemletir.',
          '<strong class="text-[#e8d5b0]">E - Korsan Bombası:</strong> Kurukafalı, fitili yanan klasik bir bomba fırlatır. Seker, yuvarlanır ve devasa bir patlama yaratır (Çatlak gizli duvarları da yıkar).',
          '<strong class="text-[#e8d5b0]">R - Ejder Namlusu (Ulti):</strong> Silahı iki elle kavrar, doldurur ve 2 saniye boyunca önüne çıkan <b>her şeyi delen devasa bir ışın</b> ateşler.'
        ]
      },
      {
        id: 'v1.1-cinci',
        title: 'YENİ SINIF: CİNCİ (WARLOCK)',
        icon: GiBookAura,
        color: 'text-purple-500',
        items: [
          '<strong class="text-[#e8d5b0]">Kara Büyü:</strong> Sol elde kara bir kitap tutarken sağ elinizden gölge okları fırlatırsınız (Ağır saldırı oku can emer).',
          '<strong class="text-[#e8d5b0]">Q - Cin Çağır:</strong> Düşmanlara ateş tüküren şeytani kanatlı cinler çağırır.',
          '<strong class="text-[#e8d5b0]">E - Cehennem Kapısı:</strong> Yerde bir portal açar ve devasa dokunaçlar düşmanları içine çekip hapseder.',
          '<strong class="text-[#e8d5b0]">R - Cehennem Efendisi (Ulti):</strong> 14 saniye boyunca yanınızda omuz omuza savaşan devasa bir iblis çağırır.',
          '<strong class="text-[#c0392b]">Ekstra:</strong> Her iki yeni sınıfa da 4\'er özel görünüm (skin), 6\'şar yetenek geliştirmesi ve 8\'er farklı ganimet silahı eklendi.'
        ]
      },
      {
        id: 'v1.1-muhafizlar',
        title: 'MUHAFIZLAR VE DÜŞMANLAR',
        icon: GiDaemonSkull,
        color: 'text-red-600',
        items: [
          'Son Muhafız (Final Boss) hariç, her koşuda bosslar artık <b>tamamen rastgele</b> çıkacak.',
          'Muhafızlar eskisinden daha dayanıklı ve sert. Yepyeni saldırı desenleri eklendi: <span class="italic text-[#c0392b]">Kıyamet Yağmuru</span> ve <span class="italic text-[#c0392b]">Şok Dalgası</span>.',
          'Final boss aşamasında gökyüzü artık kıpkırmızı oluyor.',
          '<strong class="text-[#e8d5b0]">Görsel Şölen:</strong> Tüm düşman ve muhafız modelleri baştan aşağı yeniden tasarlandı. Artık sizin karakterleriniz kadar detaylılar (Among Us\'a benzeyen o garip model tamamen oyundan kaldırıldı!).',
          'Yerdeki cesetler, tavandan asılı bedenler ve kafes içindeki iskeletler çok daha ürkütücü olacak şekilde yenilendi.'
        ]
      },
      {
        id: 'v1.1-diger',
        title: 'ZİNDANLAR VE DİĞER',
        icon: GiDungeonGate,
        color: 'text-gray-400',
        items: [
          'Zindanlara artık merdivenle çıkılan <b>korkuluklu dev teraslar</b> eklendi.',
          'Yüksek ve devasa salonlarda yürüyebileceğiniz <b>taş köprüler</b> yer alıyor.',
          'Oyuna yeteneklerinizi test edecek <b>25 yepyeni başarım (achievement)</b> eklendi.'
        ]
      }
    ]
  }
,

  {
    id: 'v1.0',
    title: 'YAMA 1.0',
    subtitle: 'Mystic Abyss II Online 🎻🔥',
    date: 'İlk Çıkış Sürümü',
    mandatory: true,
    intro: 'Ve macera resmen başlıyor! İlk büyük kararlı sürüm yayında. Çökmeler giderildi, Ozan sınıfı arenaya adım attı ve uçurumun gerçek yüzü korozyonla kendini gösterdi...',
    sections: [
      {
        id: 'v1.0-ram',
        title: '🛠️ RAM DÜZELTMESİ',
        icon: GiHammerDrop,
        color: 'text-gray-400',
        items: [
          'Oyunun RAM\'i şişirip çökmesine yol açabilecek karmaşık efekt ve malzeme (material) sorunu tamamen düzeltildi.',
          'Eğer bu sorunu tekrar yaşarsanız, şu klasördeki en yeni <code class="bg-[#1a0a0a] px-1 text-xs text-[#a89070]">godot.log</code> dosyasını bize iletin: <br/> <code class="bg-[#1a0a0a] px-2 py-1 text-[10px] text-[#a89070] break-all block mt-1">%APPDATA%\Godot\app_userdata\Mystic Abyss II Online\logs</code>'
        ]
      },
      {
        id: 'v1.0-ozan',
        title: 'YENİ SINIF: OZAN 🎻',
        icon: GiHarp,
        color: 'text-purple-400',
        items: [
          '<strong class="text-[#e8d5b0]">Destek Sınıfı:</strong> Saz çalan yepyeni bir destek sınıfı. Sol tık ile önüne doğrudan ses dalgası yollar.',
          '<strong class="text-[#e8d5b0]">Pasif Müzik:</strong> Yakındaki dostlar daha sert vurur ve yavaşça iyileşir.',
          '<strong class="text-[#e8d5b0]">Q - Cesaret Türküsü:</strong> Tüm gruba ekstra hasar ve saldırı hızı sağlar.',
          '<strong class="text-[#e8d5b0]">E - Şifa Ezgisi:</strong> Dostlarınızı anında iyileştirir.',
          '<strong class="text-[#e8d5b0]">R - Destan (Ulti):</strong> Tüm gruba devasa bir güçlendirme sağlar.'
        ]
      },
      {
        id: 'v1.0-tuslar',
        title: 'YENİ TUŞLAR VE MEKANİKLER ⚔️',
        icon: GiBroadsword,
        color: 'text-yellow-500',
        items: [
          '<strong class="text-[#c0392b]">(G) Yakın Darbe:</strong> Tekme, bıçak veya kalkanla yakın dövüş saldırısı. (Okçunun artık yakınına girenleri uzaklaştıracak bir yakın savunması var!)',
          '<strong class="text-[#c0392b]">(F5) Üçüncü Şahıs Kamera (TPS):</strong> Artık oyunu TPS oynayabilirsiniz. Koşarken kamera uzaklaşır, nişan alırken omuza yaklaşarak sinematik bir his verir.',
          '<strong class="text-[#c0392b]">(C) Sınıf Değiştir:</strong> Arenada maçın akışını bozmadan hızlıca sınıf değiştirebilirsiniz.'
        ]
      },
      {
        id: 'v1.0-guc-korozyon',
        title: 'ANLIK GÜÇLER VE KOROZYON ⚡🧠',
        icon: GiMagicSwirl,
        color: 'text-blue-400',
        items: [
          '<strong class="text-[#e8d5b0]">Anlık Küreler:</strong> Katlarda artık parlayan güç küreleri beliriyor: <span class="italic text-[#c0392b]">Kan Çılgınlığı, Uçurum Gücü, Rüzgâr Rünü, Kutsal Kalkan, Gölge Pelerini, Ruh Küresi</span>. Herkes kendi küresini ayrı ayrı alır.',
          '<strong class="text-[#e8d5b0]">Korozyon (Eski adı: Yozlaşma):</strong> Korozyon seviyeniz arttıkça kafanızda fısıltılar duymaya başlarsınız. Sahte düşman silüetleri görürsünüz ve ekran bozulmaya başlar.',
          'Korozyon arttıkça <b>hasarınız artar ancak canınız azalır</b>. Meşale ışığında durmak korozyonu yavaşça temizler.'
        ]
      },
      {
        id: 'v1.0-bolumler',
        title: 'BÖLÜMLER VE ATMOSFER 🏰',
        icon: GiDungeonGate,
        color: 'text-orange-500',
        items: [
          'Yüksek tavanlı devasa salonlar eklendi: Galeri, görkemli avizeler ve etkileyici ışık huzmeleri.',
          'Zindanlara basamaklı kürsüler yerleştirildi.',
          'Lav, kan ve boşluk ateşi çukurları ile közlü zemin çatlakları eklendi.',
          '<b>Gökyüzü Odaları:</b> Artık çok daha sık karşınıza çıkacak. İçeri girdiğinizde üzerinize sihirli yıldız tozu yağar.',
          '<b>Işıklandırma Yenilendi:</b> Meşale ışığı artık duvarlardan çok daha gerçekçi sekiyor. Oyun eskiye kıyasla biraz daha aydınlık ve oynanabilir hale geldi.'
        ]
      },
      {
        id: 'v1.0-diger',
        title: 'DİĞER DÜZELTMELER',
        icon: GiTreasureMap,
        color: 'text-[#a89070]',
        items: [
          'Okçu sınıfı artık etraftaki vazoları kırabiliyor.',
          'Özellik puanı ekranındaki yazıların üst üste binme hatası düzeltildi.',
          'Sohbet penceresi ekranın sağ tarafına taşındı.'
        ]
      }
    ]
  }
,

  {
    id: 'v0.8',
    title: 'YAMA 0.8',
    subtitle: 'Mystic Abyss II 🩸',
    date: 'Erken Erişim Sürümü',
    mandatory: true,
    intro: 'Oyunun ilk adımları... Element silahlarının, yığılabilir kalıntıların ve tek başına oynayanlar için yoldaş Ruh Kuzgunu\'nun uçurumda ilk kez göründüğü o efsanevi Erken Erişim güncellemesi!',
    sections: [
      {
        id: 'v0.8-silahlar',
        title: 'SİLAHLAR VE GANİMETLER ⚔️',
        icon: GiBroadsword,
        color: 'text-yellow-500',
        items: [
          '<strong class="text-[#e8d5b0]">Ganimet Silahları:</strong> Tam 8 farklı element ve her sınıfa özel 8 silah eklendi.',
          'Silahınızı değiştirdiğinizde sadece özellikleri değil, <b>modeli ve Q yeteneği de değişir!</b>',
          '<strong class="text-[#e8d5b0]">Nadir / Destansı / Efsanevi:</strong> Silahların nadirlik dereceleri var. Ayrıca kestiğiniz her muhafız, takımdaki herkese ayrı bir silah bırakır.',
          '<strong class="text-[#c0392b]">Kalıntılar Yığılıyor:</strong> Artık aynı kalıntıdan bir tane daha bulduğunuzda etkileri birleşerek çok daha güçlü hale gelir.'
        ]
      },
      {
        id: 'v0.8-mekanikler',
        title: 'YENİ MEKANİKLER VE GÖREVLER 📜',
        icon: GiDungeonGate,
        color: 'text-purple-400',
        items: [
          '<strong class="text-[#e8d5b0]">Ruh Kuzgunu:</strong> Tek başına oynayan (solo) oyuncular için eklendi! Yanınızda savaşır ve katta bir kez sizi mutlak bir ölümden kurtarır. 🐦‍⬛',
          '<strong class="text-[#e8d5b0]">Kat Görevleri:</strong> Zindanı keşfederken karşılaşacağınız rastgele yan görevler eklendi.',
          '<strong class="text-[#e8d5b0]">Meydan Okuma Sunağı:</strong> Üzerinize 3 dalga halinde düşman akını yollayan yeni bir sunak eklendi.'
        ]
      },
      {
        id: 'v0.8-atmosfer',
        title: 'ATMOSFER VE GRAFİKLER 🌌',
        icon: GiDaemonSkull,
        color: 'text-blue-500',
        items: [
          'Muhafız (Boss) odalarının gökyüzü artık <b>mor uzay göğü</b> olarak görünüyor.',
          'Karakterlere eklemli (rigged) yepyeni animasyonlar eklendi.',
          'Zindan duvarlarına ürkütücü kanlı duvar yazıları eklendi.',
          'Arayüz tamamen yenilendi, oyunun ruhuna uygun yeni <b>piksel yazı tipi (font)</b> eklendi.',
          'Oyun dünyasına yeni ses efektleri eklendi.'
        ]
      },
      {
        id: 'v0.8-duzeltmeler',
        title: 'DÜZELTMELER VE PERFORMANS 🛠️',
        icon: GiHammerDrop,
        color: 'text-gray-400',
        items: [
          'Modellerde yüzlerin birbirine girmesi (clipping) sorunu çözüldü.',
          'Eşyaların ve ganimetlerin üst üste doğma hatası giderildi.',
          '<strong class="text-[#e8d5b0]">Performans:</strong> RAM kullanımı sabitlendi ve oyunun genel performansı başarılı bir şekilde korundu. 🚀'
        ]
      }
    ]
  }

]

export default function PatchNotes() {
  const [activeSection, setActiveSection] = useState('v1.3')

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      let current = 'v1.3'
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop <= 150) {
          current = section.getAttribute('id') || 'v1.3'
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen relative pt-24 pb-20 px-4 md:px-8 bg-[#050000]">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top, rgba(80,10,10,0.2) 0%, transparent 80%)',
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* GERİ DÖN BUTONU */}
        <a href="/" className="inline-flex items-center gap-2 text-[#a89070] hover:text-[#e8d5b0] transition-colors mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
          <ChevronLeft size={16} /> Ana Sayfaya Dön
        </a>

        {/* 2 COLUMN LAYOUT (RIOT STYLE) */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* LEFT SIDEBAR (STICKY TOC) */}
          <div className="w-full md:w-64 shrink-0 md:sticky top-24">
            <div className="stone-border p-5 bg-black/80">
              <h3 className="text-[#e8d5b0] font-bold uppercase tracking-widest text-sm mb-6 pb-4 border-b border-[#3a1a0a]" style={{ fontFamily: 'Cinzel, serif' }}>
                İçindekiler
              </h3>
              
              <div className="flex flex-col gap-6">
                {PATCHES.map(patch => (
                  <div key={patch.id}>
                    <a 
                      href={`#${patch.id}`}
                      className={`block font-bold tracking-widest uppercase mb-3 transition-colors ${activeSection.startsWith(patch.id) ? 'text-[#c0392b]' : 'text-[#a89070] hover:text-[#e8d5b0]'}`}
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      {patch.title}
                    </a>
                    <ul className="flex flex-col gap-2 pl-3 border-l border-[#3a1a0a]">
                      {patch.sections.map(sec => (
                        <li key={sec.id}>
                          <a 
                            href={`#${sec.id}`}
                            className={`block text-xs uppercase tracking-wider transition-colors ${activeSection === sec.id ? 'text-[#e8d5b0]' : 'text-[#5a3a2a] hover:text-[#a89070]'}`}
                          >
                            {sec.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT (SCROLLING PATCH NOTES) */}
          <div className="flex-1 flex flex-col gap-24">
            
            {PATCHES.map((patch, idx) => (
              <div key={patch.id} id={patch.id} data-section className="scroll-mt-24">
                
                {/* PATCH HEADER */}
                <div className="mb-10">
                  <p className="text-[#c0392b] tracking-[0.3em] uppercase text-xs mb-2 font-bold">{patch.date}</p>
                  <h1 className="text-4xl md:text-6xl font-bold uppercase glow-red" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#e8d5b0' }}>
                    {patch.title}
                  </h1>
                  <p className="text-[#8a7060] mt-3 tracking-widest uppercase text-sm">{patch.subtitle}</p>
                  
                  {patch.mandatory && (
                    <div className="mt-6 inline-block bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-2 rounded text-xs tracking-wider">
                      <b>Zorunlu Güncelleme:</b> Eski sürümle bağlanamazsınız.
                    </div>
                  )}
                </div>

                {/* PATCH INTRO */}
                <div className="stone-border p-6 md:p-8 mb-12 bg-black/60">
                  <p className="text-md leading-relaxed text-[#c8b89a] italic border-l-2 border-[#c0392b] pl-4">
                    "{patch.intro}"
                  </p>
                </div>

                {/* PATCH SECTIONS */}
                <div className="flex flex-col gap-16">
                  {patch.sections.map(sec => (
                    <div key={sec.id} id={sec.id} data-section className="scroll-mt-24">
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`p-3 rounded-full bg-black/50 border border-[#3a1a0a] ${sec.color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                          <sec.icon size={24} />
                        </span>
                        <h2 className="text-xl md:text-2xl uppercase tracking-widest" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
                          {sec.title}
                        </h2>
                      </div>
                      
                      {sec.items && (
                        <ul className="space-y-4 pl-4 md:pl-16">
                          {sec.items.map((item, i) => (
                            <li key={i} className="flex gap-4 items-start">
                              <span className="text-[#c0392b] mt-1 text-sm">✦</span>
                              <p className="text-md text-[#c8b89a] leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                            </li>
                          ))}
                        </ul>
                      )}

                      {sec.cards && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-16">
                          {sec.cards.map((card, i) => (
                            <div key={i} className={`stone-border p-4 bg-black/40 hover:bg-black/60 transition-colors ${card.span ? 'md:col-span-2' : ''}`}>
                              <h3 className="text-md text-[#e8d5b0] mb-2 uppercase tracking-widest font-bold">{card.title}</h3>
                              <p className="text-[#a89070] text-xs leading-relaxed">{card.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* DIVIDER BETWEEN PATCHES */}
                {idx < PATCHES.length - 1 && (
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#5a3a2a] to-transparent mt-24" />
                )}
              </div>
            ))}

            <div className="text-center mt-12 pt-12 border-t border-[#3a1a0a]">
              <p className="text-[#5a3a2a] text-xs tracking-widest font-bold uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                Karanlıkta Yalnız Değilsiniz
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
