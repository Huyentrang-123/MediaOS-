/* ============================================================
   MediaOS — Static Data
   ============================================================ */

const DATA = {

  /* --- Viral Videos Mock Data --- */
  videos: [
    { id:1,  title:"Routine dưỡng da ban đêm 5 bước — da sáng bóng sau 7 ngày",       platform:"tiktok",   region:"vn", views:"2.4M", likes:"187K", comments:"9.2K",  shares:"45K",  author:"@skincare_vn_official", emoji:"🌙", tags:["nightroutine","dưỡngda","skincare"],  category:"skincare",      duration:"0:52", date:"2024-12-10", trending:true  },
    { id:2,  title:"K-Beauty Glass Skin Secret — 10 bước dưỡng da Hàn Quốc",          platform:"rednote",  region:"kr", views:"5.1M", likes:"312K", comments:"14.8K", shares:"88K",  author:"@kbeauty_official",     emoji:"✨", tags:["Kbeauty","glassskin","skincare"],     category:"skincare",      duration:"12:34",date:"2024-11-22", trending:false },
    { id:3,  title:"美白精华合集 — Top 10 最有效祛斑美白精华推荐",                         platform:"douyin",   region:"cn", views:"8.7M", likes:"521K", comments:"23.1K", shares:"120K", author:"@美妆达人小李",           emoji:"💎", tags:["美白","祛斑","精华"],              category:"lam-trang",     duration:"1:15", date:"2024-12-05", trending:true  },
    { id:4,  title:"台灣女生保養秘訣 — 祛斑淡斑實測分享",                                  platform:"rednote",  region:"tw", views:"1.2M", likes:"98K",  comments:"5.4K",  shares:"22K",  author:"@tw_beauty_queen",      emoji:"💄", tags:["祛斑","台灣","保養"],              category:"nam-tan-nhang", duration:"0:45", date:"2024-11-30", trending:false },
    { id:5,  title:"Nhật Bản skincare — bí quyết da trắng sáng không tì vết",          platform:"tiktok",   region:"jp", views:"3.3M", likes:"245K", comments:"11.2K", shares:"67K",  author:"@japan_beauty_tips",    emoji:"🌸", tags:["Nhậtbản","datrắng","skincare"],   category:"skincare",      duration:"0:38", date:"2024-12-01", trending:false },
    { id:6,  title:"Thái Lan beauty hack — kem dưỡng 59 baht da như sao Hàn",          platform:"tiktok",   region:"th", views:"1.8M", likes:"134K", comments:"7.1K",  shares:"34K",  author:"@thai_beauty_secret",   emoji:"🌺", tags:["ThaiBeauty","skincare","dưỡngẩm"],category:"skincare",      duration:"0:43", date:"2024-11-25", trending:false },
    { id:7,  title:"Serum Vitamin C Before & After — kết quả thực 30 ngày",            platform:"facebook", region:"us", views:"4.2M", likes:"289K", comments:"18.3K", shares:"95K",  author:"@skincarebyscience",    emoji:"⚗️", tags:["vitaminC","beforeafter","serum"],  category:"serum",         duration:"8:22", date:"2024-12-08", trending:true  },
    { id:8,  title:"Kem nám dưỡng trắng châu Âu — review chi tiết 10 sản phẩm",        platform:"facebook", region:"eu", views:"0.9M", likes:"72K",  comments:"3.8K",  shares:"18K",  author:"@europeanbeauty",       emoji:"🇪🇺", tags:["kemnam","làmtrắng","dưỡngda"],    category:"kem-nam",       duration:"0:59", date:"2024-11-18", trending:false },
    { id:9,  title:"Son Tint viral review — 15 màu môi đẹp nhất 2024",                 platform:"tiktok",   region:"vn", views:"1.6M", likes:"123K", comments:"6.7K",  shares:"29K",  author:"@lipstick_queen_vn",    emoji:"💋", tags:["sontint","môi","dadep"],          category:"da-dep",        duration:"1:02", date:"2024-12-12", trending:true  },
    { id:10, title:"스킨케어 루틴 공개 — 7일 만에 피부가 달라졌어요",                       platform:"tiktok",   region:"kr", views:"6.2M", likes:"441K", comments:"19.4K", shares:"102K", author:"@koreanglowskin",       emoji:"🔆", tags:["스킨케어","루틴","피부"],          category:"skincare",      duration:"0:57", date:"2024-12-03", trending:true  },
    { id:11, title:"日本最新防晒霜测评 — SPF50不泛白美白防晒推荐",                           platform:"douyin",   region:"jp", views:"2.1M", likes:"156K", comments:"8.9K",  shares:"52K",  author:"@japan_beauty_lab",     emoji:"☀️", tags:["防晒","美白","护肤"],              category:"lam-trang",     duration:"9:15", date:"2024-11-20", trending:false },
    { id:12, title:"Serum trị nám tàn nhang hiệu quả — so sánh 8 sản phẩm",            platform:"facebook", region:"vn", views:"0.8M", likes:"61K",  comments:"4.2K",  shares:"16K",  author:"@skincare_review_vn",   emoji:"💧", tags:["trịnám","tànnhang","serum"],     category:"nam-tan-nhang", duration:"15:30",date:"2024-12-07", trending:true  },
    { id:13, title:"Makeup da đẹp tự nhiên — no filter challenge viral",                platform:"tiktok",   region:"vn", views:"3.7M", likes:"298K", comments:"13.5K", shares:"78K",  author:"@makeup_magic_vn",      emoji:"👁️", tags:["dadep","makeup","nofilter"],      category:"da-dep",        duration:"0:31", date:"2024-12-09", trending:true  },
    { id:14, title:"Kem dưỡng chống lão hóa tốt nhất 2024 — guide cho người mới",      platform:"facebook", region:"us", views:"7.8M", likes:"456K", comments:"25.7K", shares:"134K", author:"@dermatologytips",      emoji:"🔬", tags:["retinol","chonglaoho","skincare"],category:"chong-lao-hoa", duration:"11:45",date:"2024-11-15", trending:false },
    { id:15, title:"小红书爆款祛斑精华 — 韩国明星都在用的淡斑秘诀",                           platform:"rednote",  region:"kr", views:"2.2M", likes:"178K", comments:"9.8K",  shares:"56K",  author:"@koreannaturalbeauty",  emoji:"🎋", tags:["祛斑","淡斑","精华"],              category:"kem-nam",       duration:"1:18", date:"2024-12-04", trending:false },
    { id:16, title:"Skincare tiết kiệm cho học sinh — routine đơn giản hiệu quả",      platform:"tiktok",   region:"vn", views:"1.1M", likes:"89K",  comments:"5.1K",  shares:"21K",  author:"@student_skincare_vn",  emoji:"🎒", tags:["tiếtkiệm","họcsinh","skincare"],  category:"skincare",      duration:"0:48", date:"2024-11-28", trending:false },
    { id:17, title:"台灣必買抗老精華 — 抗衰老保濕逆齡秘訣",                                 platform:"douyin",   region:"tw", views:"1.5M", likes:"108K", comments:"6.3K",  shares:"38K",  author:"@taiwan_antiage",       emoji:"🛒", tags:["抗老","逆齡","精華"],              category:"chong-lao-hoa", duration:"18:22",date:"2024-11-12", trending:false },
    { id:18, title:"Xịt khoáng dưỡng ẩm — review 10 loại tốt nhất cho da dầu",        platform:"tiktok",   region:"vn", views:"0.7M", likes:"54K",  comments:"3.1K",  shares:"13K",  author:"@mist_lover_vn",        emoji:"💦", tags:["xịtkhoáng","dưỡngẩm","dadau"],   category:"skincare",      duration:"1:07", date:"2024-12-06", trending:false },
    { id:19, title:"Serum làm trắng da nhanh nhất — thử nghiệm thực tế 14 ngày",       platform:"tiktok",   region:"th", views:"2.8M", likes:"211K", comments:"10.2K", shares:"58K",  author:"@asianskintips",        emoji:"🌞", tags:["làmtrắng","serum","trắngda"],     category:"serum",         duration:"0:55", date:"2024-12-02", trending:true  },
    { id:20, title:"Kem nám ban đêm — trị nám chân chì hiệu quả tại nhà",              platform:"tiktok",   region:"vn", views:"4.5M", likes:"335K", comments:"16.8K", shares:"89K",  author:"@acne_fighter_vn",      emoji:"🧴", tags:["kemnam","trịnám","dưỡngda"],     category:"kem-nam",       duration:"0:44", date:"2024-12-11", trending:true  }
  ],

  /* --- Trending Data --- */
  trending: {
    hashtags: [
      { tag:"#SkincareRoutine", platform:"tiktok",    region:"vn",     posts:"2.3M",  growth:"+45%", hot:true  },
      { tag:"#KBeauty",         platform:"tiktok",    region:"global", posts:"18.7M", growth:"+32%", hot:true  },
      { tag:"#美白护肤",          platform:"tiktok",    region:"cn",     posts:"8.4M",  growth:"+28%", hot:true  },
      { tag:"#GlassSkin",       platform:"instagram", region:"global", posts:"5.2M",  growth:"+38%", hot:true  },
      { tag:"#日本护肤",          platform:"youtube",   region:"jp",     posts:"3.1M",  growth:"+22%", hot:false },
      { tag:"#VitaminCSerum",   platform:"youtube",   region:"us",     posts:"1.9M",  growth:"+51%", hot:true  },
      { tag:"#datrắng",         platform:"tiktok",    region:"vn",     posts:"1.4M",  growth:"+29%", hot:false },
      { tag:"#台灣美妝",          platform:"instagram", region:"tw",     posts:"0.9M",  growth:"+17%", hot:false },
      { tag:"#SunscreenSPF50",  platform:"tiktok",    region:"global", posts:"4.7M",  growth:"+44%", hot:true  },
      { tag:"#Retinol",         platform:"youtube",   region:"us",     posts:"2.8M",  growth:"+67%", hot:true  }
    ],
    categories: [
      { name:"Serum Vitamin C",        share:28, trend:"up"     },
      { name:"Kem chống nắng",         share:22, trend:"up"     },
      { name:"Toner nước hoa hồng",    share:18, trend:"stable" },
      { name:"Kem dưỡng ban đêm",      share:15, trend:"up"     },
      { name:"Son môi & Tint",         share:12, trend:"down"   },
      { name:"Retinol / Niacinamide",  share:5,  trend:"up"     }
    ],
    formats: [
      { format:"Before/After (30 ngày)",        effectiveness:95, icon:"🔄" },
      { format:"Unboxing & First Impression",   effectiveness:88, icon:"📦" },
      { format:"Get Ready With Me",             effectiveness:82, icon:"💄" },
      { format:"Skincare Routine Vlog",         effectiveness:79, icon:"🎬" },
      { format:"Top 5 / Best of",              effectiveness:74, icon:"🏆" },
      { format:"Myth Busting",                 effectiveness:68, icon:"🔬" }
    ]
  },

  /* --- Knowledge Base Articles --- */
  articles: [
    {
      id:1, category:"strategy", readTime:"8 phút",
      title:"Chiến lược content mỹ phẩm hiệu quả trên TikTok năm 2024",
      excerpt:"TikTok đang là nền tảng hot nhất cho ngành mỹ phẩm tại châu Á. Bài viết này hướng dẫn cách xây dựng chiến lược content đúng hướng.",
      content:`
<h4>Tại sao TikTok là kênh vàng cho ngành mỹ phẩm?</h4>
<p>Với 82% người dùng TikTok ở Việt Nam trong độ tuổi 18-35 — đúng tệp target của ngành mỹ phẩm — đây là nền tảng có tỷ lệ tiếp cận organic cao nhất hiện nay. Một video viral trên TikTok có thể đạt 1 triệu view chỉ trong 48 giờ.</p>
<h4>5 công thức content hiệu quả nhất</h4>
<ul>
<li><strong>Before/After:</strong> Video trước/sau sử dụng sản phẩm trong 7-30 ngày. Tỷ lệ xem hết: 78%</li>
<li><strong>POV (Point of View):</strong> Quay từ góc nhìn người dùng, tạo cảm giác thân mật</li>
<li><strong>Duet với KOLs:</strong> Tăng reach tự nhiên nhờ base follower của KOL</li>
<li><strong>Trending Sound:</strong> Ghép sản phẩm vào âm thanh đang viral</li>
<li><strong>Educational:</strong> Giải thích thành phần, cơ chế tác dụng</li>
</ul>
<h4>Thời điểm đăng bài tối ưu</h4>
<p>Dựa trên phân tích 1,000 tài khoản mỹ phẩm lớn trên TikTok Việt Nam:</p>
<ul>
<li>Giờ vàng buổi sáng: 7:00 - 9:00</li>
<li>Giờ vàng buổi trưa: 11:30 - 13:00</li>
<li>Giờ vàng buổi tối: 20:00 - 22:00</li>
<li>Thứ 3, 5, 7 có tương tác cao nhất</li>
</ul>
<div class="tip-box">💡 <strong>Tip:</strong> Luôn dùng trending sound trong 3 ngày đầu sau khi âm thanh xuất hiện để tận dụng thuật toán đẩy reach.</div>
<h4>KPI cần theo dõi</h4>
<ul>
<li>Watch Rate (tỷ lệ xem hết) > 40%: Video đang hoạt động tốt</li>
<li>Engagement Rate > 5%: Tương tác tốt</li>
<li>Share Rate > 1%: Nội dung có khả năng viral</li>
</ul>
      `,
      tags:["TikTok","Strategy","Viral"]
    },
    {
      id:2, category:"platform", readTime:"6 phút",
      title:"Hướng dẫn nghiên cứu thị trường mỹ phẩm Hàn Quốc cho team content",
      excerpt:"K-Beauty luôn dẫn đầu xu hướng toàn cầu. Hiểu thị trường Hàn là bước đầu tiên để tạo nội dung phù hợp với xu hướng.",
      content:`
<h4>Các nguồn nghiên cứu xu hướng K-Beauty</h4>
<p>Trước khi tạo content về K-Beauty, team cần nắm chắc các nguồn thông tin chính thống:</p>
<ul>
<li><strong>Naver Beauty:</strong> Forum lớn nhất Hàn Quốc, nơi người dùng review sản phẩm thực tế</li>
<li><strong>Hwahae App:</strong> App review mỹ phẩm #1 Hàn Quốc, tương đương Beautypedia</li>
<li><strong>Olive Young:</strong> Chuỗi bán lẻ lớn nhất — top sellers là gì = đang trend</li>
<li><strong>TikTok KR:</strong> Theo dõi hashtag #뷰티, #스킨케어, #화장법</li>
</ul>
<h4>Chu kỳ xu hướng K-Beauty</h4>
<p>K-Beauty thường đi trước global trend khoảng 6-12 tháng. Nếu một sản phẩm viral ở Hàn hôm nay, khả năng cao 6-9 tháng sau sẽ viral ở VN.</p>
<div class="tip-box">💡 Theo dõi các KOL Hàn có 100K-500K follower (mid-tier influencer) — họ thường review sản phẩm mới trước khi mainstream.</div>
<h4>Top 5 xu hướng K-Beauty đang hot</h4>
<ul>
<li>Glass Skin 2.0 — layering toner nhiều lần</li>
<li>Chok Chok (촉촉) — da căng mọng, ẩm mướt</li>
<li>Slugging — occlusive moisturizer là bước cuối ban đêm</li>
<li>Skinimalism — tối giản hóa quy trình skincare</li>
<li>Hanbang Beauty — kết hợp thảo dược truyền thống</li>
</ul>
      `,
      tags:["Korea","K-Beauty","Research"]
    },
    {
      id:3, category:"creative", readTime:"10 phút",
      title:"Framework viết caption quảng cáo mỹ phẩm chuyển đổi cao",
      excerpt:"Caption tốt có thể tăng CTR lên đến 3 lần so với caption thông thường. Học công thức viết caption bán hàng hiệu quả.",
      content:`
<h4>Công thức AIDA cho caption mỹ phẩm</h4>
<p><strong>A</strong>ttention — <strong>I</strong>nterest — <strong>D</strong>esire — <strong>A</strong>ction</p>
<ul>
<li><strong>Attention (Dòng đầu tiên):</strong> Phải gây chú ý trong 3 giây. Dùng câu hỏi, số liệu, hoặc pain point</li>
<li><strong>Interest:</strong> Giải thích WHY — tại sao sản phẩm này khác biệt</li>
<li><strong>Desire:</strong> Vẽ kết quả — da sẽ trông như thế nào sau khi dùng</li>
<li><strong>Action:</strong> CTA rõ ràng — "Tap link in bio", "Comment SIZE để nhận tư vấn"</li>
</ul>
<h4>Template caption phổ biến</h4>
<p><em>Mẫu 1 — Pain Point:</em><br>"Bạn đang tốn tiền vào serum mà da không đổi? 🤔 Có thể do [lý do]. [Tên sản phẩm] giải quyết đúng vấn đề này nhờ [thành phần chính]. Kết quả thực sau 14 ngày 👇"</p>
<p><em>Mẫu 2 — Social Proof:</em><br>"500+ review 5 sao không nói dối. [Tên sản phẩm] — sản phẩm được order lại nhiều nhất tháng này của team mình. Da [mô tả kết quả]. Comment 'INFO' để biết thêm 🌸"</p>
<div class="tip-box">💡 <strong>Quy tắc vàng:</strong> Không bao giờ đặt CTA quá sớm. Phải tạo đủ desire trước khi kêu gọi hành động.</div>
<h4>Từ khóa trigger mua hàng hiệu quả</h4>
<ul>
<li>"Kết quả thực sau X ngày"</li>
<li>"Không cần filter"</li>
<li>"Da mình tự nhiên như này"</li>
<li>"Đã thử X loại, chỉ cái này work"</li>
<li>"Sold out liên tục vì..."</li>
</ul>
      `,
      tags:["Copywriting","Caption","Creative"]
    },
    {
      id:4, category:"analytics", readTime:"7 phút",
      title:"Cách đọc và phân tích dashboard analytics cho campaign mỹ phẩm",
      excerpt:"Biết đọc số liệu là kỹ năng thiết yếu của content creator. Hiểu metrics nào quan trọng và cách cải thiện chúng.",
      content:`
<h4>Metrics quan trọng nhất theo từng giai đoạn</h4>
<ul>
<li><strong>Awareness:</strong> Reach, Impression, View Rate</li>
<li><strong>Engagement:</strong> Like, Comment, Share, Save, Engagement Rate</li>
<li><strong>Conversion:</strong> Click, Link Click Rate, Purchase, ROAS</li>
<li><strong>Retention:</strong> Follower Growth, Return Visitor Rate</li>
</ul>
<h4>Benchmark ngành mỹ phẩm VN</h4>
<p>So sánh kết quả campaign với benchmark để đánh giá hiệu quả:</p>
<ul>
<li>TikTok Engagement Rate trung bình: 5-8% (tốt: >10%)</li>
<li>Instagram Reel Reach Rate: 20-30% (tốt: >40%)</li>
<li>Facebook Video View Rate: 15-25% (tốt: >35%)</li>
<li>CTR Quảng cáo trả phí mỹ phẩm VN: 1.5-3%</li>
<li>ROAS (Return on Ad Spend) tối thiểu: 3x</li>
</ul>
<div class="tip-box">💡 <strong>Tip:</strong> Luôn so sánh campaign hiện tại với campaign cùng tháng năm ngoái (Year-over-Year), không chỉ tháng trước (Month-over-Month) vì có yếu tố mùa vụ.</div>
<h4>Dấu hiệu content cần tối ưu</h4>
<ul>
<li>Watch Rate < 30%: Hook đầu video chưa đủ mạnh</li>
<li>Comment nhiều "giá?" nhưng ít click: Caption thiếu giá/CTA</li>
<li>Save Rate cao nhưng Comment thấp: Nội dung hữu ích nhưng chưa kích thích tương tác</li>
<li>Share Rate cao: Nội dung viral — nhân rộng format này</li>
</ul>
      `,
      tags:["Analytics","Metrics","Dashboard"]
    },
    {
      id:5, category:"strategy", readTime:"5 phút",
      title:"Lập kế hoạch content calendar mỹ phẩm theo mùa vụ",
      excerpt:"Content calendar theo mùa giúp team lên kế hoạch trước, không bị reactive, và tận dụng tối đa các dịp lễ mua sắm.",
      content:`
<h4>Các dịp lễ quan trọng trong năm</h4>
<ul>
<li><strong>Tháng 1-2:</strong> Tết Nguyên Đán — son môi, quà tặng tết</li>
<li><strong>Tháng 3:</strong> Quốc tế phụ nữ 8/3 — gift set cao cấp</li>
<li><strong>Tháng 4-5:</strong> Mùa hè — kem chống nắng, dưỡng ẩm nhẹ</li>
<li><strong>Tháng 6:</strong> Mid-year sale — combo deal, bundle</li>
<li><strong>Tháng 10:</strong> Halloween — makeup creative</li>
<li><strong>Tháng 11:</strong> 11.11 Singles Day — mega sale, countdown</li>
<li><strong>Tháng 12:</strong> Noel, cuối năm — gift, skincare review năm</li>
</ul>
<h4>Lên content 2 tuần trước sự kiện</h4>
<p>Rule of thumb: bắt đầu content teaser 2 tuần trước, đỉnh điểm 3-5 ngày trước sự kiện, và follow-up sau sự kiện.</p>
<div class="tip-box">💡 Dùng module Calendar trong app này để lên kế hoạch Campaign. Đặt deadline content trước event ít nhất 5 ngày làm việc để có thời gian duyệt và chỉnh sửa.</div>
      `,
      tags:["Calendar","Planning","Seasonal"]
    },
    {
      id:6, category:"creative", readTime:"9 phút",
      title:"Hướng dẫn quay và edit video mỹ phẩm đẹp bằng điện thoại",
      excerpt:"Không cần máy quay đắt tiền. Với điện thoại và kỹ thuật đúng, bạn vẫn tạo được video chuyên nghiệp thu hút triệu view.",
      content:`
<h4>Setup quay cơ bản</h4>
<ul>
<li><strong>Ánh sáng:</strong> Dùng ring light hoặc natural light cạnh cửa sổ. KHÔNG dùng đèn vàng trực tiếp</li>
<li><strong>Nền:</strong> Nền trắng, nền marble, hoặc nền màu pastel. Tránh nền lộn xộn</li>
<li><strong>Tripod:</strong> Bắt buộc để video ổn định. Giá từ 150K</li>
<li><strong>Góc quay:</strong> 45 độ cho sản phẩm, ngang tầm mắt cho người</li>
</ul>
<h4>B-roll cần thiết cho video mỹ phẩm</h4>
<ul>
<li>Texture của sản phẩm (serum nhỏ giọt, kem tan vào da)</li>
<li>Packaging — xoay 360 độ</li>
<li>Apply lên da — close up</li>
<li>Before/After face shots</li>
<li>Lifestyle shots — sản phẩm trong bối cảnh tự nhiên</li>
</ul>
<h4>App edit miễn phí tốt nhất</h4>
<ul>
<li><strong>CapCut:</strong> Tốt nhất cho TikTok, nhiều template trending</li>
<li><strong>InShot:</strong> Đơn giản, phù hợp người mới</li>
<li><strong>VN Editor:</strong> Tính năng mạnh, miễn phí hoàn toàn</li>
<li><strong>Lightroom Mobile:</strong> Màu sắc ảnh chuyên nghiệp</li>
</ul>
<div class="tip-box">💡 <strong>Hook vàng:</strong> 3 giây đầu phải có visual gây tò mò — sản phẩm đổ ra, skin transformation, hoặc câu hỏi bất ngờ trên màn hình.</div>
      `,
      tags:["Video","Creative","Filming"]
    }
  ],

  /* --- Campaigns --- */
  campaigns: [
    { id:1, name:"Ra mắt Serum Vitamin C Ultra Bright",   status:"active",    startDate:"2024-12-01", endDate:"2025-01-31", budget:"80,000,000",  platforms:["tiktok","instagram","facebook"], description:"Chiến dịch ra mắt dòng serum Vitamin C mới nhắm vào tệp 18-30 tuổi quan tâm đến làm trắng da và chống oxy hóa.", progress:45,  kol:"Tier 2-3 KOL (10 người)" },
    { id:2, name:"Tết Ất Tỵ — Gift Set Cao Cấp",          status:"planning",  startDate:"2025-01-10", endDate:"2025-02-05", budget:"120,000,000", platforms:["tiktok","youtube","facebook"],   description:"Campaign Tết tập trung vào gift set premium. Thông điệp tặng quà ý nghĩa cho người thân yêu.",                   progress:15,  kol:"KOL Tier 1 (3 người) + Tier 2 (8 người)" },
    { id:3, name:"Summer Glow — Sunscreen Collection",     status:"completed", startDate:"2024-05-01", endDate:"2024-07-31", budget:"60,000,000",  platforms:["tiktok","instagram"],           description:"Chiến dịch mùa hè giới thiệu dòng kem chống nắng cho da nhạy cảm. Viral với hashtag #SummerGlowVN.",            progress:100, kol:"Tier 2 KOL (12 người)" },
    { id:4, name:"11.11 Mega Sale — Bundle Deal",          status:"completed", startDate:"2024-11-01", endDate:"2024-11-15", budget:"45,000,000",  platforms:["tiktok","facebook","shopee"],   description:"Flash sale ngày 11/11 với các bundle deal tiết kiệm 40-60%. Kết hợp countdown video và livestream.",             progress:100, kol:"Livestreamer (5 người)" }
  ],

  /* --- Ideas --- */
  ideas: [
    { id:1, title:"Series 'Thành phần đọc hiểu' — giải mã INCI list",          status:"new",         priority:"high",   category:"Educational", description:"Series video giải thích thành phần mỹ phẩm cho người không chuyên. Mỗi video focus 1 thành phần (Niacinamide, Retinol, AHA/BHA...)", tags:["education","series","skincare"] },
    { id:2, title:"Challenge #30NgàyDaGlow — UGC Campaign",                    status:"new",         priority:"high",   category:"UGC",         description:"Tạo hashtag challenge khuyến khích người dùng chụp ảnh da sau 30 ngày dùng sản phẩm. Giải thưởng hấp dẫn.",                          tags:["UGC","challenge","viral"] },
    { id:3, title:"Collab với food creator — skincare from inside out",         status:"in-progress", priority:"medium", category:"Collab",      description:"Kết hợp với food influencer để nói về mối liên hệ giữa dinh dưỡng và da đẹp. Cross-promotion audience.",                              tags:["collab","food","wellness"] },
    { id:4, title:"Podcast mini — 'Chuyện làng beauty' cùng chuyên gia",       status:"in-progress", priority:"low",    category:"Audio",       description:"Series podcast ngắn 10-15 phút phỏng vấn bác sĩ da liễu, makeup artist về các chủ đề hot trong ngành beauty.",                       tags:["podcast","expert","audio"] },
    { id:5, title:"Video so sánh giá — Drugstore vs High-end",                 status:"done",        priority:"medium", category:"Review",      description:"So sánh sản phẩm cùng công dụng ở phân khúc bình dân và cao cấp. Video đã viral 2.1M view.",                                            tags:["review","comparison","drugstore"] },
    { id:6, title:"Behind-the-scenes team content lab",                        status:"done",        priority:"low",    category:"BTS",         description:"Video hậu trường quy trình sản xuất content của team. Tăng brand trust và recruitment interest.",                                         tags:["BTS","team","brand"] }
  ],

  /* --- Team --- */
  team: [
    { id:1, name:"Nguyễn Thị Hương", role:"Content Lead",         emoji:"👩‍💼", skills:["Strategy","Analytics","Copywriting"],     email:"huong@mediaos.com", note:"Phụ trách chiến lược nội dung tổng thể và định hướng brand voice" },
    { id:2, name:"Trần Minh Khoa",   role:"Video Creator",         emoji:"🎬",  skills:["Filming","Editing","CapCut"],             email:"khoa@mediaos.com",  note:"Chuyên quay và edit video TikTok, Reels. Sở trường Before/After" },
    { id:3, name:"Lê Thu Trang",     role:"Social Media Manager",  emoji:"📱",  skills:["TikTok","Instagram","Scheduling"],        email:"trang@mediaos.com", note:"Quản lý lịch đăng và community management trên các nền tảng" },
    { id:4, name:"Phạm Quốc Bảo",   role:"Research Analyst",      emoji:"🔍",  skills:["Market Research","Data","Excel"],         email:"bao@mediaos.com",   note:"Nghiên cứu thị trường, theo dõi xu hướng và phân tích competitors" },
    { id:5, name:"Đỗ Lan Anh",       role:"KOL Manager",           emoji:"🤝",  skills:["KOL Relations","Negotiation","Campaign"], email:"lanh@mediaos.com",  note:"Quản lý mối quan hệ và hợp đồng với KOL/KOC trên tất cả nền tảng" },
    { id:6, name:"Vũ Hoàng Nam",     role:"Graphic Designer",      emoji:"🎨",  skills:["Photoshop","Canva","Branding"],           email:"nam@mediaos.com",   note:"Thiết kế creative assets, thumbnail, infographic cho tất cả kênh" }
  ],

  /* --- Guidelines / SOPs --- */
  guidelines: [
    {
      id:1, category:"research", icon:"🔍",
      title:"Quy trình nghiên cứu nội dung viral hàng tuần",
      steps: [
        { title:"Bước 1: Quét xu hướng (30 phút — Thứ 2 đầu tuần)",  desc:"Mở Viral Research Hub, tìm kiếm theo từ khóa liên quan đến sản phẩm đang campaign. Lọc theo khu vực VN + KR + CN. Lưu ít nhất 10 video đáng tham khảo." },
        { title:"Bước 2: Phân tích hashtag trending (15 phút)",       desc:"Vào Trend Analysis, xem danh sách hashtag đang tăng trưởng mạnh. Ghi nhận 5 hashtag phù hợp để dùng trong tuần." },
        { title:"Bước 3: Audit competitors (20 phút)",                desc:"Kiểm tra 3-5 đối thủ chính: họ đang post format gì? Thành phần nào đang được nói đến? Video nào của họ đang viral?" },
        { title:"Bước 4: Brief content week (10 phút)",               desc:"Tổng hợp insights vào file brief tuần. Đề xuất 3-5 ý tưởng content cho tuần tới dựa trên nghiên cứu." },
        { title:"Bước 5: Họp team briefing (Thứ 2, 9:00)",           desc:"Chia sẻ findings với team, phân công content cho từng người, set deadline cụ thể." }
      ]
    },
    {
      id:2, category:"production", icon:"🎬",
      title:"Quy trình sản xuất video TikTok/Reels",
      steps: [
        { title:"Bước 1: Nhận brief và hiểu mục tiêu",               desc:"Đọc kỹ creative brief. Xác định: ai là target audience? Thông điệp chính là gì? CTA là gì? Format phù hợp nhất?" },
        { title:"Bước 2: Viết script/storyboard",                     desc:"Viết script chi tiết cho từng cảnh. Hook (3 giây đầu) phải được viết kỹ nhất. Review script với Content Lead trước khi quay." },
        { title:"Bước 3: Chuẩn bị props và setup",                   desc:"Chuẩn bị sản phẩm, nền, ánh sáng, tripod. Check pin máy quay. Test âm thanh nếu có VO." },
        { title:"Bước 4: Quay (Golden hour + Backup shots)",          desc:"Quay đủ B-roll: texture, packaging, apply. Quay nhiều góc để có lựa chọn khi edit. Backup tất cả file ngay sau khi quay." },
        { title:"Bước 5: Edit và caption",                            desc:"Edit theo template đã approve. Thêm text, âm thanh trending. Viết caption theo công thức AIDA. Chọn cover hấp dẫn." },
        { title:"Bước 6: Review và approve",                          desc:"Gửi cho Content Lead review. Chỉnh sửa theo feedback. Khi được approve, submit vào lịch đăng bài." }
      ]
    },
    {
      id:3, category:"publishing", icon:"📅",
      title:"Quy trình lên lịch và đăng bài",
      steps: [
        { title:"Bước 1: Điền vào content calendar",                  desc:"Đăng bài vào calendar ít nhất 3 ngày trước ngày đăng. Điền đủ: nền tảng, format, caption, hashtag, giờ đăng, người phụ trách." },
        { title:"Bước 2: Upload và schedule",                         desc:"Upload video/ảnh lên nền tảng. Schedule đúng giờ vàng. Kiểm tra caption, hashtag, tag product lần cuối trước khi schedule." },
        { title:"Bước 3: Community management (30 phút sau đăng)",   desc:"Ngay khi bài vừa đăng, trả lời 10-15 comment đầu tiên để boost engagement cho thuật toán." },
        { title:"Bước 4: Theo dõi performance (24h & 72h)",          desc:"Kiểm tra metrics sau 24h và 72h. Nếu video performance thấp hơn benchmark, báo cáo và phân tích nguyên nhân." },
        { title:"Bước 5: Report weekly",                              desc:"Mỗi cuối tuần, điền số liệu vào báo cáo weekly. Highlight video best và worst performance, rút kinh nghiệm cho tuần sau." }
      ]
    },
    {
      id:4, category:"kol", icon:"🤝",
      title:"Quy trình làm việc với KOL/KOC",
      steps: [
        { title:"Bước 1: Research và vetting KOL",                    desc:"Dùng Phân tích Viral Research để xem KOL đang hợp tác với brand nào. Kiểm tra: fake follower ratio < 15%, engagement rate > 3%, audience demographics phù hợp." },
        { title:"Bước 2: Outreach và negotiation",                    desc:"Liên hệ qua DM hoặc email. Chuẩn bị Media Kit của brand. Thương lượng: số video, format, deadline, giá, quyền sở hữu content." },
        { title:"Bước 3: Brief KOL",                                  desc:"Gửi KOL brief chi tiết: brand guideline, key messages, sản phẩm cần highlight, những điều KHÔNG được nói. Deadline gửi draft để review." },
        { title:"Bước 4: Review draft content",                       desc:"KOL gửi draft 3-5 ngày trước deadline đăng. Review theo checklist: brand voice, key message, CTA, hashtag. Feedback tối đa 1 lần revision." },
        { title:"Bước 5: Monitor và báo cáo",                        desc:"Theo dõi performance post của KOL trong 7 ngày đầu. Chụp màn hình số liệu. Tổng hợp vào báo cáo KOL performance cuối campaign." }
      ]
    },
    {
      id:5, category:"onboarding", icon:"🎓",
      title:"Checklist onboarding nhân viên mới",
      checklist: [
        "Đọc toàn bộ phần Guidelines & SOP trong Content Lab",
        "Hoàn thành tự học: xem 20 video viral nhất trong Knowledge Base",
        "Theo dõi ít nhất 30 tài khoản beauty lớn tại VN, KR, CN",
        "Cài đặt và làm quen với các tool: CapCut, Canva, Google Analytics",
        "Tham gia 1 tuần research cùng senior để học quy trình",
        "Thực hành viết 3 caption theo công thức AIDA và nhận feedback",
        "Shadow 1 buổi quay video và 1 buổi edit với Video Creator",
        "Nắm rõ brand guideline: màu sắc, font, tone of voice",
        "Hiểu cách đọc metrics dashboard (xem bài Knowledge Base về Analytics)",
        "Hoàn thành campaign planning cùng team (mini campaign)"
      ]
    }
  ],

  regions: [
    { id:"global", label:"🌏 Toàn cầu" },
    { id:"vn",     label:"🇻🇳 Việt Nam" },
    { id:"kr",     label:"🇰🇷 Hàn Quốc" },
    { id:"cn",     label:"🇨🇳 Trung Quốc" },
    { id:"tw",     label:"🇹🇼 Đài Loan" },
    { id:"jp",     label:"🇯🇵 Nhật Bản" },
    { id:"th",     label:"🇹🇭 Thái Lan" },
    { id:"us",     label:"🇺🇸 Mỹ" },
    { id:"eu",     label:"🇪🇺 Châu Âu" }
  ],

  categories: [
    { id:"all",           label:"Tất cả loại" },
    { id:"skincare",      label:"Skincare" },
    { id:"nam-tan-nhang", label:"Nám tàn nhang" },
    { id:"serum",         label:"Serum" },
    { id:"kem-nam",       label:"Kem nám" },
    { id:"lam-trang",     label:"Làm trắng" },
    { id:"chong-lao-hoa", label:"Chống lão hóa" },
    { id:"da-dep",        label:"Da đẹp" }
  ],

  platforms: [
    { id:"all",      label:"Tất cả nền tảng" },
    { id:"tiktok",   label:"TikTok" },
    { id:"facebook", label:"Facebook" },
    { id:"douyin",   label:"Douyin (抖音)" },
    { id:"rednote",  label:"RedNote (小红书)" }
  ],

  articleCategories: [
    { id:"all",       label:"Tất cả" },
    { id:"strategy",  label:"Chiến lược" },
    { id:"platform",  label:"Nền tảng" },
    { id:"creative",  label:"Sáng tạo" },
    { id:"analytics", label:"Phân tích" }
  ],

  quickSearches: [
    { label:"🔥 Viral toàn cầu",       query:"viral skincare 2024",    regions:["global"] },
    { label:"🇨🇳 美白精华",              query:"美白精华 护肤",           regions:["cn"] },
    { label:"🇰🇷 Skincare Hàn",         query:"스킨케어 루틴",           regions:["kr"] },
    { label:"🇹🇼 Mỹ phẩm Đài Loan",    query:"台灣美妝 保養",           regions:["tw"] },
    { label:"🇯🇵 Beauty Nhật",          query:"日本护肤 スキンケア",     regions:["jp"] },
    { label:"🇻🇳 Viral VN",             query:"skincare routine viral",  regions:["vn"] }
  ],

  statusConfig: {
    active:    { label:"Đang chạy",    class:"badge-success" },
    planning:  { label:"Lên kế hoạch", class:"badge-warning" },
    completed: { label:"Hoàn thành",   class:"badge-gray" },
    paused:    { label:"Tạm dừng",     class:"badge-error" }
  },

  priorityConfig: {
    high:   { label:"Cao",         emoji:"🔴" },
    medium: { label:"Trung bình",  emoji:"🟡" },
    low:    { label:"Thấp",        emoji:"🟢" }
  },

  ideaStatusConfig: {
    "new":         { label:"Ý tưởng mới",     color:"#3182ce", next:"in-progress", nextLabel:"→ In Progress" },
    "in-progress": { label:"Đang thực hiện",  color:"#d69e2e", next:"done",        nextLabel:"→ Hoàn thành"  },
    "done":        { label:"Hoàn thành",      color:"#38a169", next:"new",         nextLabel:"↺ Reopen"      }
  },

  platformEmoji: {
    tiktok:    "🎵",
    facebook:  "👤",
    douyin:    "🎬",
    rednote:   "📕",
    shopee:    "🛒",
    youtube:   "▶️",
    instagram: "📸"
  }
};
