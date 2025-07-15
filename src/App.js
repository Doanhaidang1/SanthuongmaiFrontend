import React, { useState, useEffect, useCallback } from 'react';

// Các sản phẩm
const mockProducts = [
    {
        id: '1',
        name: 'Khóa học Tiếng Anh Giao tiếp cơ bản',
        price: 450000,
        image: 'https://placehold.co/400x300/E0F2F7/000000?text=English+Course',
        shortDescription: 'Nắm vững các cấu trúc giao tiếp hàng ngày.',
        longDescription: 'Khóa học này được thiết kế dành cho người mới bắt đầu, giúp bạn xây dựng nền tảng vững chắc về ngữ pháp và từ vựng, đồng thời thực hành giao tiếp trong các tình huống thực tế. Bao gồm 20 bài học video, bài tập tương tác và buổi học trực tuyến với giáo viên.',
        reviews: ['Rất hay và dễ hiểu!', 'Giáo viên nhiệt tình.', 'Phù hợp cho người mới bắt đầu.'],
        category: 'language'
    },
    {
        id: '2',
        name: 'Giáo trình Lập trình Python từ A-Z',
        price: 800000,
        image: 'https://placehold.co/400x300/F0E68C/000000?text=Python+Book',
        shortDescription: 'Học Python từ cơ bản đến nâng cao.',
        longDescription: 'Cuốn giáo trình toàn diện này bao gồm mọi thứ bạn cần biết về Python, từ cú pháp cơ bản đến các khái niệm nâng cao như lập trình hướng đối tượng, xử lý dữ liệu và phát triển web. Kèm theo nhiều bài tập thực hành và dự án nhỏ.',
        reviews: ['Sách rất chi tiết!', 'Code mẫu dễ hiểu.', 'Tuyệt vời cho người mới bắt đầu lập trình.'],
        category: 'programming'
    },
    {
        id: '3',
        name: 'Lớp học Trực tuyến Thiết kế UI/UX',
        price: 1200000,
        image: 'https://placehold.co/400x300/DDA0DD/000000?text=UI/UX+Class',
        shortDescription: 'Trở thành chuyên gia thiết kế giao diện và trải nghiệm người dùng.',
        longDescription: 'Khóa học trực tuyến này sẽ trang bị cho bạn kiến thức và kỹ năng cần thiết để thiết kế giao diện người dùng (UI) và trải nghiệm người dùng (UX) chuyên nghiệp. Học qua các dự án thực tế và nhận phản hồi từ các chuyên gia trong ngành.',
        reviews: ['Giảng viên có kinh nghiệm.', 'Nhiều bài tập thực hành.', 'Rất hữu ích cho sự nghiệp.'],
        category: 'design'
    },
    {
        id: '4',
        name: 'Tài liệu Ôn thi IELTS cấp tốc',
        price: 300000,
        image: 'https://placehold.co/400x300/B0E0E6/000000?text=IELTS+Material',
        shortDescription: 'Tài liệu tổng hợp giúp bạn đạt điểm cao IELTS.',
        longDescription: 'Bộ tài liệu này bao gồm các chiến lược làm bài, bài tập thực hành cho cả 4 kỹ năng (Nghe, Nói, Đọc, Viết) và các đề thi thử IELTS mới nhất. Phù hợp cho những ai muốn ôn thi cấp tốc và đạt mục tiêu điểm cao.',
        reviews: ['Tài liệu rất sát đề thi.', 'Giúp tôi tăng band điểm.', 'Nên mua nếu muốn ôn thi IELTS.'],
        category: 'language'
    },
    {
        id: '5',
        name: 'Khóa học Kế toán Doanh nghiệp',
        price: 700000,
        image: 'https://placehold.co/400x300/FFDAB9/000000?text=Accounting+Course',
        shortDescription: 'Kiến thức kế toán thực tế cho doanh nghiệp.',
        longDescription: 'Khóa học cung cấp kiến thức chuyên sâu về kế toán doanh nghiệp, từ nguyên lý cơ bản đến các nghiệp vụ phức tạp. Phù hợp cho sinh viên ngành kế toán, người đi làm muốn nâng cao kỹ năng hoặc người muốn chuyển ngành.',
        reviews: ['Nội dung đầy đủ.', 'Dễ áp dụng vào thực tế.', 'Rất đáng tiền.'],
        category: 'business'
    },
    {
        id: '6',
        name: 'Sách "Marketing 4.0" của Philip Kotler',
        price: 250000,
        image: 'https://placehold.co/400x300/ADD8E6/000000?text=Marketing+Book',
        shortDescription: 'Khám phá kỷ nguyên mới của marketing kỹ thuật số.',
        longDescription: 'Cuốn sách kinh điển này của Philip Kotler sẽ đưa bạn đi sâu vào thế giới marketing 4.0, nơi công nghệ và con người hòa quyện. Tìm hiểu cách các doanh nghiệp có thể thích nghi và phát triển trong bối cảnh kỹ thuật số hiện nay.',
        reviews: ['Sách hay, nhiều kiến thức mới.', 'Nên đọc cho dân marketing.', 'Giao hàng nhanh.'],
        category: 'business'
    },
    {
        id: '7',
        name: 'Lớp học Guitar cơ bản cho người mới',
        price: 600000,
        image: 'https://placehold.co/400x300/98FB98/000000?text=Guitar+Class',
        shortDescription: 'Học chơi guitar từ những bài học đầu tiên.',
        longDescription: 'Khóa học này dành cho những người chưa từng chơi guitar, hướng dẫn từ cách cầm đàn, các hợp âm cơ bản đến việc chơi những bài hát đơn giản. Giảng viên nhiệt tình, có kinh nghiệm.',
        reviews: ['Giáo viên rất kiên nhẫn.', 'Học nhanh tiến bộ.', 'Rất vui khi được học.'],
        category: 'music'
    },
    {
        id: '8',
        name: 'Khóa học Photoshop từ A-Z',
        price: 950000,
        image: 'https://placehold.co/400x300/F08080/000000?text=Photoshop+Course',
        shortDescription: 'Làm chủ công cụ chỉnh sửa ảnh hàng đầu.',
        longDescription: 'Khóa học này sẽ giúp bạn thành thạo Photoshop, từ các công cụ cơ bản đến các kỹ thuật chỉnh sửa ảnh chuyên nghiệp, thiết kế đồ họa và tạo hiệu ứng. Phù hợp cho cả người mới bắt đầu và những ai muốn nâng cao kỹ năng.',
        reviews: ['Học được nhiều mẹo hay.', 'Bài tập thực hành sát thực tế.', 'Rất đáng giá.'],
        category: 'design'
    },
    {
        id: '9',
        name: 'Ebook "Bí quyết học ngôn ngữ nhanh"',
        price: 150000,
        image: 'https://placehold.co/400x300/FFD700/000000?text=Language+Ebook',
        shortDescription: 'Những phương pháp hiệu quả để học bất kỳ ngôn ngữ nào.',
        longDescription: 'Ebook này tổng hợp các bí quyết và phương pháp đã được chứng minh để học ngôn ngữ một cách nhanh chóng và hiệu quả. Từ việc xây dựng thói quen đến các kỹ thuật ghi nhớ từ vựng và luyện tập giao tiếp.',
        reviews: ['Ebook rất hữu ích.', 'Đã áp dụng và thấy hiệu quả.', 'Nên đọc cho người học ngoại ngữ.'],
        category: 'language'
    },
    {
        id: '10',
        name: 'Lớp học Yoga Online cho người mới bắt đầu',
        price: 400000,
        image: 'https://placehold.co/400x300/DDA0DD/000000?text=Yoga+Class',
        shortDescription: 'Cải thiện sức khỏe và tinh thần với Yoga.',
        longDescription: 'Khóa học Yoga trực tuyến này được thiết kế đặc biệt cho người mới bắt đầu, giúp bạn làm quen với các tư thế cơ bản, kỹ thuật thở và thư giãn. Tập luyện tại nhà với sự hướng dẫn của giáo viên chuyên nghiệp.',
        reviews: ['Rất thư giãn.', 'Giáo viên hướng dẫn chi tiết.', 'Cảm thấy khỏe hơn nhiều.'],
        category: 'health'
    },
    {
        id: '11',
        name: 'Khóa học Tiếng Nhật N5 cấp tốc',
        price: 550000,
        image: 'https://placehold.co/400x300/FFC0CB/000000?text=Japanese+Course',
        shortDescription: 'Học tiếng Nhật từ con số 0, đạt N5 nhanh chóng.',
        longDescription: 'Khóa học này tập trung vào việc xây dựng nền tảng vững chắc cho tiếng Nhật N5, bao gồm Hiragana, Katakana, Kanji cơ bản, ngữ pháp và giao tiếp hàng ngày. Phù hợp cho những ai muốn du học hoặc làm việc tại Nhật Bản.',
        reviews: ['Giáo trình dễ hiểu.', 'Giảng viên phát âm chuẩn.', 'Rất hiệu quả để bắt đầu.'],
        category: 'language'
    },
    {
        id: '12',
        name: 'Sách "Tư duy nhanh và chậm" của Daniel Kahneman',
        price: 350000,
        image: 'https://placehold.co/400x300/F5DEB3/000000?text=Thinking+Fast+Slow',
        shortDescription: 'Khám phá hai hệ thống tư duy ảnh hưởng đến quyết định của bạn.',
        longDescription: 'Cuốn sách đoạt giải Nobel này sẽ giúp bạn hiểu rõ hơn về cách bộ não hoạt động, phân biệt giữa tư duy nhanh (hệ thống 1) và tư duy chậm (hệ thống 2), từ đó đưa ra những quyết định sáng suốt hơn trong cuộc sống và công việc.',
        reviews: ['Sách rất sâu sắc.', 'Thay đổi cách tôi suy nghĩ.', 'Nên đọc cho mọi người.'],
        category: 'psychology'
    },
    {
        id: '13',
        name: 'Khóa học Excel Nâng cao cho Kế toán',
        price: 850000,
        image: 'https://placehold.co/400x300/D3D3D3/000000?text=Excel+Accounting',
        shortDescription: 'Làm chủ Excel với các hàm và công cụ chuyên sâu cho kế toán.',
        longDescription: 'Khóa học này tập trung vào việc sử dụng Excel một cách hiệu quả trong công việc kế toán, bao gồm các hàm tài chính, phân tích dữ liệu, tạo báo cáo động và tự động hóa các tác vụ lặp lại.',
        reviews: ['Thực hành nhiều, dễ hiểu.', 'Ứng dụng ngay vào công việc.', 'Rất cần thiết cho kế toán viên.'],
        category: 'business'
    },
    {
        id: '14',
        name: 'Lớp học Vẽ Kỹ thuật số cơ bản (Photoshop/Procreate)',
        price: 1100000,
        image: 'https://placehold.co/400x300/FFDAB9/000000?text=Digital+Drawing',
        shortDescription: 'Bắt đầu hành trình sáng tạo với vẽ kỹ thuật số.',
        longDescription: 'Khóa học hướng dẫn từ các khái niệm cơ bản về màu sắc, ánh sáng, bố cục đến việc sử dụng các công cụ trong Photoshop và Procreate để tạo ra các tác phẩm nghệ thuật kỹ thuật số. Phù hợp cho người mới bắt đầu và những ai muốn chuyển từ vẽ truyền thống.',
        reviews: ['Giáo viên hướng dẫn tận tình.', 'Nhiều bài tập sáng tạo.', 'Rất thích thú với khóa học này.'],
        category: 'design'
    },
    {
        id: '15',
        name: 'Khóa học Chụp ảnh Cơ bản cho Người mới',
        price: 750000,
        image: 'https://placehold.co/400x300/C0C0C0/000000?text=Photography+Course',
        shortDescription: 'Nắm vững các kỹ thuật chụp ảnh cơ bản để tạo ra những bức ảnh đẹp.',
        longDescription: 'Khóa học này sẽ hướng dẫn bạn về các khái niệm cơ bản của nhiếp ảnh như khẩu độ, tốc độ màn trập, ISO, ánh sáng và bố cục. Bạn sẽ học cách sử dụng máy ảnh của mình một cách hiệu quả và chụp được những bức ảnh ấn tượng.',
        reviews: ['Học được nhiều điều bổ ích.', 'Giáo viên rất thân thiện.', 'Giúp tôi chụp ảnh đẹp hơn.'],
        category: 'art'
    },
    {
        id: '16',
        name: 'Ebook "Quản lý thời gian hiệu quả"',
        price: 120000,
        image: 'https://placehold.co/400x300/E6E6FA/000000?text=Time+Management',
        shortDescription: 'Các chiến lược để tối ưu hóa năng suất và quản lý thời gian cá nhân.',
        longDescription: 'Ebook này cung cấp các phương pháp và công cụ thực tế để bạn quản lý thời gian hiệu quả hơn, từ việc lập kế hoạch hàng ngày đến việc ưu tiên công việc và tránh trì hoãn.',
        reviews: ['Ebook rất thực tế.', 'Giúp tôi sắp xếp công việc tốt hơn.', 'Nên đọc để cải thiện năng suất.'],
        category: 'self-improvement'
    },
    {
        id: '17',
        name: 'Khóa học Pha chế Cà phê tại nhà',
        price: 480000,
        image: 'https://placehold.co/400x300/D2B48C/000000?text=Coffee+Making',
        shortDescription: 'Trở thành barista tại gia với các công thức pha chế cà phê phổ biến.',
        longDescription: 'Khóa học này sẽ hướng dẫn bạn cách chọn hạt cà phê, các phương pháp pha chế khác nhau (espresso, pour-over, cold brew), và cách tạo ra những ly cà phê ngon như ở quán ngay tại nhà.',
        reviews: ['Rất thú vị và dễ học.', 'Giúp tôi pha cà phê ngon hơn.', 'Nên thử nếu yêu cà phê.'],
        category: 'hobby'
    },
    {
        id: '18',
        name: 'Lớp học Lập trình Web với React & Node.js',
        price: 1500000,
        image: 'https://placehold.co/400x300/A7C7E7/000000?text=React+NodeJS',
        shortDescription: 'Xây dựng ứng dụng web full-stack với công nghệ hiện đại.',
        longDescription: 'Khóa học chuyên sâu này sẽ trang bị cho bạn kiến thức để phát triển ứng dụng web từ đầu đến cuối, sử dụng React cho giao diện người dùng và Node.js (Express) cho phần backend, bao gồm cả kết nối cơ sở dữ liệu.',
        reviews: ['Nội dung cập nhật.', 'Giảng viên chuyên nghiệp.', 'Rất đáng tiền cho một khóa full-stack.'],
        category: 'programming'
    },
    {
        id: '19',
        name: 'Ebook "Khởi nghiệp tinh gọn" của Eric Ries',
        price: 280000,
        image: 'https://placehold.co/400x300/FFDDC1/000000?text=Lean+Startup',
        shortDescription: 'Áp dụng phương pháp Lean Startup để xây dựng doanh nghiệp thành công.',
        longDescription: 'Cuốn sách này giới thiệu phương pháp Lean Startup, giúp các doanh nghiệp khởi nghiệp và đổi mới sản phẩm một cách hiệu quả, giảm thiểu rủi ro và tối đa hóa cơ hội thành công thông qua vòng lặp Build-Measure-Learn.',
        reviews: ['Sách kinh điển cho startup.', 'Nhiều bài học thực tế.', 'Rất cần thiết cho doanh nhân.'],
        category: 'business'
    },
    {
        id: '20',
        name: 'Khóa học Thiền định và Chánh niệm',
        price: 650000,
        image: 'https://placehold.co/400x300/B2EBF2/000000?text=Meditation+Mindfulness',
        shortDescription: 'Thực hành thiền định để giảm căng thẳng và tăng cường sự tập trung.',
        longDescription: 'Khóa học này hướng dẫn các kỹ thuật thiền định và chánh niệm cơ bản, giúp bạn tìm thấy sự bình yên nội tâm, cải thiện sức khỏe tinh thần và tăng cường khả năng tập trung trong cuộc sống hàng ngày.',
        reviews: ['Rất thư thái.', 'Giúp tôi giảm stress.', 'Nên thử cho những ai bận rộn.'],
        category: 'health'
    }
];

// Hàm trợ giúp để định dạng tiền tệ
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Thông báo Toast
const NotificationToast = ({ message, type, onClose }) => {
    // Màu sắc nền và chữ dựa trên loại thông báo
    const bgColor = type === 'success' ? 'bg-emerald-700' : 'bg-red-700'; 
    const textColor = 'text-white';

    return (
        <div className={`fixed bottom-4 right-4 ${bgColor} ${textColor} p-4 rounded-lg shadow-lg flex items-center justify-between z-50 animate-fade-in-up`}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-white hover:text-gray-200 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

// Sản phẩm Card
const ProductCard = ({ product, onShowDetails, onToggleFavorite, isFavorite }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-sky-700 font-bold text-lg mb-2">{formatCurrency(product.price)}</p> {}
                <p className="text-gray-700 text-sm mb-4 flex-grow">{product.shortDescription}</p> {}
                <div className="flex justify-between items-center mt-auto">
                    <button
                        onClick={() => onShowDetails(product)}
                        className="bg-sky-700 text-white px-4 py-2 rounded-lg hover:bg-sky-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-opacity-50" 
                    >
                        Xem chi tiết
                    </button>
                    <button
                        onClick={() => onToggleFavorite(product.id)}
                        className={`p-2 rounded-full transition-colors duration-300 ${isFavorite ? 'text-red-600 bg-red-100 hover:bg-red-200' : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`}
                        aria-label={isFavorite ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Chi tiết sản phẩm 
const ProductDetailModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scale-95 animate-scale-in">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
                            aria-label="Đóng"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex justify-center items-center">
                            <img src={product.image} alt={product.name} className="rounded-lg max-h-80 object-contain w-full" />
                        </div>
                        <div>
                            <p className="text-sky-700 font-bold text-2xl mb-4">{formatCurrency(product.price)}</p> {}
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Mô tả chi tiết:</h3>
                            <p className="text-gray-700 mb-4 leading-relaxed">{product.longDescription}</p> {}
                            {product.reviews && product.reviews.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Đánh giá:</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1"> {}
                                        {product.reviews.map((review, index) => (
                                            <li key={index}>{review}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Loading skeleton
const SuggestionSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl shadow-lg h-72"></div>
        ))}
    </div>
);

// Giao diện chính của ứng dụng
const App = () => {
    const [products] = useState(mockProducts); 
    const [filteredProducts, setFilteredProducts] = useState(mockProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [viewedHistory, setViewedHistory] = useState(() => {
        const savedHistory = localStorage.getItem('viewedHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [suggestionError, setSuggestionError] = useState('');
    const [currentPage, setCurrentPage] = useState('home'); 
    const [notification, setNotification] = useState(null); 

    // Lưu yêu thích và lịch sử xem 
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('viewedHistory', JSON.stringify(viewedHistory));
    }, [viewedHistory]);

    // Tìm kiếm và lọc
    useEffect(() => {
        let tempProducts = products;

        // Tìm kiếm
        if (searchTerm) {
            tempProducts = tempProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Lọc theo giá
        if (priceFilter) {
            tempProducts = tempProducts.filter(product => {
                if (priceFilter === '<500K') return product.price < 500000;
                if (priceFilter === '500K-1M') return product.price >= 500000 && product.price <= 1000000;
                if (priceFilter === '>1M') return product.price > 1000000;
                return true;
            });
        }

        setFilteredProducts(tempProducts);
    }, [searchTerm, priceFilter, products]);

    // Xử lý hiển thị modal chi tiết sản phẩm
    const handleShowDetails = useCallback((product) => {
        setSelectedProduct(product);
        setShowModal(true);
        // Thêm vào lịch sử xem nếu chưa có
        setViewedHistory(prevHistory => {
            if (!prevHistory.includes(product.id)) {
                return [...prevHistory, product.id];
            }
            return prevHistory;
        });
    }, []);

    // Xử lý đóng modal chi tiết sản phẩm
    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        setSelectedProduct(null);
    }, []);

    // Xử lý bật/tắt trạng thái yêu thích
    const handleToggleFavorite = useCallback((productId) => {
        setFavorites(prevFavorites => {
            const isCurrentlyFavorite = prevFavorites.includes(productId);
            let newFavorites;
            let message;
            let type;

            if (isCurrentlyFavorite) {
                newFavorites = prevFavorites.filter(id => id !== productId);
                message = 'Đã xóa khỏi danh sách yêu thích!';
                type = 'success';
            } else {
                newFavorites = [...prevFavorites, productId];
                message = 'Đã thêm vào danh sách yêu thích!';
                type = 'success';
            }

            setNotification({ message, type });
            setTimeout(() => setNotification(null), 3000); // Ẩn sau 3 giây
            return newFavorites;
        });
    }, []);

    // Hàm tạo gợi ý ngẫu nhiên
    const generateRandomSuggestions = useCallback((allProducts, excludeIds, count) => {
        const available = allProducts.filter(p => !excludeIds.includes(p.id));
        const shuffled = available.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }, []);

    // Giả lập cuộc gọi API gợi ý AI
    const fetchSuggestions = useCallback(async () => {
        setLoadingSuggestions(true);
        setSuggestionError('');
        setSuggestions([]);

        try {
            // Giả lập độ trễ của cuộc gọi API
            await new Promise(resolve => setTimeout(resolve, 1500));

            const userBehaviorCategories = new Set();
            viewedHistory.forEach(id => {
                const product = products.find(p => p.id === id);
                if (product && product.category) {
                    userBehaviorCategories.add(product.category);
                }
            });
            favorites.forEach(id => {
                const product = products.find(p => p.id === id);
                if (product && product.category) {
                    userBehaviorCategories.add(product.category);
                }
            });

            let suggestedProducts = [];
            const excludedIds = new Set([...favorites, ...viewedHistory]); // Loại trừ các sản phẩm đã yêu thích hoặc đã xem

            if (userBehaviorCategories.size > 0) {
                // Ưu tiên các sản phẩm từ danh mục mà người dùng đã tương tác
                const categoryBasedSuggestions = products.filter(p =>
                    userBehaviorCategories.has(p.category) && !excludedIds.has(p.id)
                );
                // Lấy tối đa 2 sản phẩm ngẫu nhiên từ nhóm này để đa dạng hóa
                suggestedProducts.push(...generateRandomSuggestions(categoryBasedSuggestions, [], 2));
                suggestedProducts = [...new Set(suggestedProducts)]; // Loại bỏ các bản sao
            }

            // Điền vào các vị trí còn trống bằng các sản phẩm ngẫu nhiên không có trong yêu thích hoặc đã được gợi ý
            if (suggestedProducts.length < 4) {
                const currentExcludedIds = new Set([...excludedIds, ...suggestedProducts.map(p => p.id)]);
                const randomFill = generateRandomSuggestions(products, Array.from(currentExcludedIds), 4 - suggestedProducts.length);
                suggestedProducts.push(...randomFill);
            }

            // Đảm bảo duy nhất và giới hạn 4 gợi ý để hiển thị
            setSuggestions(suggestedProducts.slice(0, 4));
        } catch (error) {
            console.error('Lỗi khi lấy gợi ý:', error);
            setSuggestionError('Không thể lấy gợi ý lúc này. Vui lòng thử lại sau.');
        } finally {
            setLoadingSuggestions(false);
        }
    }, [products, favorites, viewedHistory, generateRandomSuggestions]);

    // Xử lý xóa lịch sử xem
    const handleClearHistory = useCallback(() => {
        setViewedHistory([]);
        setNotification({ message: 'Lịch sử xem đã được xóa!', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
    }, []);

    // Lấy các sản phẩm yêu thích thực tế cho trang Yêu thích
    const favoriteProducts = products.filter(product => favorites.includes(product.id));
    // Lấy các sản phẩm đã xem thực tế cho phần lịch sử xem
    const actualViewedHistoryProducts = viewedHistory.map(id => products.find(p => p.id === id)).filter(Boolean);

    return (
        <div className="min-h-screen bg-stone-100 font-inter text-gray-800"> {}
            {}
            <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-40">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-sky-700">Sàn thương mại</h1> {}
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <button
                                    onClick={() => setCurrentPage('home')}
                                    className={`text-lg font-medium ${currentPage === 'home' ? 'text-sky-700 border-b-2 border-sky-700' : 'text-gray-700 hover:text-sky-700'} transition-colors duration-200 focus:outline-none`} // Màu xanh da trời cho active/hover
                                >
                                    Trang chủ
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setCurrentPage('favorites')}
                                    className={`text-lg font-medium ${currentPage === 'favorites' ? 'text-sky-700 border-b-2 border-sky-700' : 'text-gray-700 hover:text-sky-700'} transition-colors duration-200 focus:outline-none`} // Màu xanh da trời cho active/hover
                                >
                                    Yêu thích ({favorites.length})
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {currentPage === 'home' ? (
                    <>
                        {/* Phần Tìm kiếm và lọc sản phẩm theo tiền */}
                        <section className="mb-8 bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tìm kiếm & Lọc sản phẩm</h2>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên khóa học..."
                                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all duration-200" // Vòng focus màu xanh da trời
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <select
                                    className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all duration-200" // Vòng focus màu xanh da trời
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                >
                                    <option value="">Tất cả giá</option>
                                    <option value="<500K">Dưới 500.000 VNĐ</option>
                                    <option value="500K-1M">500.000 VNĐ - 1.000.000 VNĐ</option>
                                    <option value=">1M">Trên 1.000.000 VNĐ</option>
                                </select>
                            </div>
                            <button
                                onClick={fetchSuggestions}
                                className="w-full sm:w-auto bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-opacity-50" // Nút màu xanh ngọc đậm hơn
                            >
                                Gợi ý sản phẩm phù hợp (AI)
                            </button>
                        </section>

                        {/* Phần Gợi ý AI */}
                        <section className="mb-10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Gợi ý từ AI dành cho bạn</h2>
                                <button
                                    onClick={fetchSuggestions}
                                    className="bg-sky-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-opacity-50" // Nút màu xanh da trời
                                >
                                    Làm mới gợi ý
                                </button>
                            </div>
                            {loadingSuggestions ? (
                                <SuggestionSkeleton />
                            ) : suggestionError ? (
                                <div className="bg-red-50 border border-red-400 text-red-800 px-4 py-3 rounded relative" role="alert"> {/* Màu đỏ điều chỉnh cho thông báo lỗi */}
                                    <strong className="font-bold">Lỗi!</strong>
                                    <span className="block sm:inline"> {suggestionError}</span>
                                </div>
                            ) : suggestions.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {suggestions.map(product => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onShowDetails={handleShowDetails}
                                            onToggleFavorite={handleToggleFavorite}
                                            isFavorite={favorites.includes(product.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-700">Bấm "Gợi ý sản phẩm phù hợp" để nhận các gợi ý từ AI!</p>
                            )}
                        </section>

                        {/* Phần Danh sách sản phẩm */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tất cả sản phẩm</h2>
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {filteredProducts.map(product => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onShowDetails={handleShowDetails}
                                            onToggleFavorite={handleToggleFavorite}
                                            isFavorite={favorites.includes(product.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-700">Không tìm thấy sản phẩm nào phù hợp.</p>
                            )}
                        </section>

                        {/* Phần Lịch sử xem */}
                        {actualViewedHistoryProducts.length > 0 && (
                            <section className="mb-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Lịch sử xem của bạn</h2>
                                    <button
                                        onClick={handleClearHistory}
                                        className="bg-red-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50" // Nút màu đỏ đậm hơn
                                    >
                                        Xóa lịch sử
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {actualViewedHistoryProducts.map(product => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onShowDetails={handleShowDetails}
                                            onToggleFavorite={handleToggleFavorite}
                                            isFavorite={favorites.includes(product.id)}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                ) : (
                    /* Trang Yêu thích */
                    <section className="mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sản phẩm yêu thích của bạn</h2>
                        {favoriteProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {favoriteProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onShowDetails={handleShowDetails}
                                        onToggleFavorite={handleToggleFavorite}
                                        isFavorite={favorites.includes(product.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-700 text-lg">Bạn chưa có sản phẩm yêu thích nào. Hãy khám phá và thêm vào nhé!</p>
                        )}
                    </section>
                )}
            </main>

            {/* Modal chi tiết sản phẩm */}
            <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />

            {/* Thông báo Toast */}
            {notification && (
                <NotificationToast
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
};

export default App;
