import React from 'react';
import FooterComponents from '../../FooterComponents';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import { TabTitle } from 'src/utils/GeneralFunctions';

const TermsOfServices = () => {
  const { t } = useTranslation('title');
  TabTitle(`${t('termsOfServiceTL')}`);
  return (
    <FooterComponents
      title='Điều khoản dịch vụ'
      children={
        <div className='footer_TermOfServices'>
          <h5>1. ĐIỀU KHOẢN CHUNG</h5>
          <p>
            Bằng cách truy cập hoặc sử dụng trang web jobsit.vn dù truy cập bằng
            cách nào, bạn đồng ý chịu sự ràng buộc của các điều khoản sử dụng
            này ("Điều khoản sử dụng"). Dịch vụ do It Jobs sở hữu hoặc kiểm
            soát. Các Điều khoản sử dụng này ảnh hưởng đến quyền và nghĩa vụ
            pháp lý của bạn. Nếu bạn không đồng ý chịu sự ràng buộc của tất cả
            các Điều khoản sử dụng này, bạn không truy cập hay sử dụng Dịch vụ.
            Nếu Bạn có bất kỳ câu hỏi nào liên quan đến Điều Khoản này, vui lòng
            liên hệ chúng tôi tại email: …{' '}
          </p>
          <p>
            Chúng tôi có thể cập nhật Điều Khoản này theo thời gian vì các lý do
            pháp lý hoặc theo quy định hoặc để cho phép hoạt động thích hợp của
            trang web Jobsit.vn. Mọi thay đổi sẽ được thông báo tới bạn bằng một
            thông báo phù hợp trên trang web của chúng tôi. Những thay đổi này
            sẽ áp dụng cho việc sử dụng trang web Jobsit.vn. Sau khi chúng tôi
            đã thông báo đến bạn, Nếu bạn không muốn chấp nhận Điều Khoản mới,
            bạn không nên tiếp tục sử dụng trang web Jobsit.vn. Nếu bạn tiếp tục
            sử dụng trang web Jobsit.vn kể từ ngày sự thay đổi có hiệu lực, việc
            sử dụng trang web Jobsit.vn thể hiện bạn đồng ý bị ràng buộc bởi
            Điều Khoản mới.{' '}
          </p>
          <h5>2. ĐĂNG KÝ</h5>
          <p>
            Để sử dụng Dịch vụ bạn phải tạo một tài khoản theo yêu cầu của It
            Jobs, bạn cam kết rằng việc sử dụng tài khoản phải tuân thủ các quy
            định của It Jobs, đồng thời tất cả các thông tin bạn cung cấp cho
            chúng tôi là đúng, chính xác, đầy đủ với tại thời điểm được yêu cầu.
            Mọi quyền lợi và nghĩa vụ của bạn sẽ căn cứ trên thông tin tài khoản
            bạn đã đăng ký, do đó nếu có bất kỳ thông tin sai lệch nào chúng tôi
            sẽ không chịu trách nhiệm trong trường hợp thông tin đó làm ảnh
            hưởng hoặc hạn chế quyền lợi của bạn.{' '}
          </p>
          <h5>3. MẬT KHẨU VÀ BẢO MẬT</h5>
          <p>
            Khi bạn đăng ký sử dụng trang web Jobsit.vn bạn sẽ được yêu cầu khởi
            tạo mật khẩu. Để tránh việc gian lận, bạn phải giữ mật khẩu này bảo
            mật và không được tiết lộ hoặc chia sẻ với bất kỳ người nào. Nếu bạn
            biết hoặc nghi ngờ người khác biết mật khẩu của bạn, bạn nên thông
            báo với chúng tôi ngay lập tức bằng cách liên hệ với chúng tôi tại
            email (…){' '}
          </p>
          <p>
            Nếu Jobsit.vn có lý do để tin rằng có khả năng có hành vi vi phạm
            bảo mật hoặc sử dụng không đúng mục đích trang web Jobsit.vn, chúng
            tôi có thể yêu cầu bạn thay đổi mật khẩu hoặc chúng tôi có thể tạm
            dừng tài khoản của bạn.{' '}
          </p>
          <p>
            Trường hợp bạn mất Mật khẩu hoặc hoặc sử dụng không đúng mục đích
            trang web Jobsit.vn{' '}
          </p>
          <p>Bạn phải chịu tất cả sự mất mát hoặc thiệt hại phát sinh; và </p>
          <p>
            Bạn chịu trách nhiệm sẽ bồi thường hoàn toàn cho It Jobs trong
            trường hợp It Jobs có xảy ra mất mát hoặc thiệt hại.{' '}
          </p>
          <h5>4. QUYỀN TRUY CẬP VÀ THU THẬP THÔNG TIN </h5>
          <p>
            Khi sử dụng trang web Jobsit.vn, bạn thừa nhận rằng chúng tôi có
            quyền thu thập các thông tin sau của bạn:{' '}
          </p>
          <p>
            Thông tin cá nhân: bao gồm các thông tin bạn cung cấp cho chúng tôi
            để tạo hồ sơ như tên, số điện thoại, địa chỉ email…{' '}
          </p>
          <p>
            Thông tin chung: như các thông tin về kinh nghiệm làm việc, định
            hướng nghề nghiệp, mục tiêu công việc; trình độ năng lực; thu nhập…{' '}
          </p>
          <p>
            Bạn thừa nhận và đồng ý một mình chịu trách nhiệm về hình thức, nội
            dung và tính xác thực của bất kỳ hồ sơ hoăc tài liệu nào do bạn đăng
            tải trên trang web Jobsit.vn, đồng thời đồng ý một mình chịu trách
            nhiệm cho bất kỳ hệ quả nào phát sinh từ việc đăng tải này.{' '}
          </p>
          <p>
            It Jobs có quyền đề xuất đến bạn dịch vụ và sản phẩm của bên thứ ba
            dựa trên các mục phù hợp mà bạn xác định trong khi đăng ký và bất kỳ
            lúc nào sau đó hoặc khi bạn đã đồng ý tiếp nhận, các đề xuất này sẽ
            được thực hiện bởi It Jobs hoặc các bên thứ ba.{' '}
          </p>
          <p>
            It Jobs được quyền tùy ý tuân theo các yêu cầu pháp lý, các yêu cầu
            từ cơ quan thi hành án hoặc yêu cầu của cơ quan quản lý, thậm chí sự
            tuân thủ này có thể bao gồm việc công bố một số thông tin Người dùng
            nhất định. Ngoài ra, bên thứ ba được phép giữ lại các bản sao lưu
            trữ thông tin Người dùng.{' '}
          </p>
          <p>
            Bạn hiểu và thừa nhận rằng tất cả các thông tin do bạn cung cấp,
            Thông tin cá nhân, hồ sơ và/hoặc thông tin tài khoản của bạn, sẽ
            được công bố cho các Nhà tuyển dụng tiềm năng trên It Jobs.{' '}
          </p>
          <p>
            It Jobs tôn trọng tuyệt đối quyền bảo mật thông tin của ứng viên.
            Nếu không muốn hồ sơ cá nhân của mình được công khai, bạn vui lòng
            tắt tính năng tìm việc & tính năng cho phép nhà tuyển dụng xem hồ sơ
            để tránh bị làm phiền.{' '}
          </p>
          <p>
            Bạn hiểu và thừa nhận rằng bạn không có các quyền sở hữu trong tài
            khoản của bạn và nếu bạn hủy bỏ tài khoản trên trang web Jobsit.vn
            hoặc tài khoản của bạn bị chấm dứt, tất cả các thông tin tài khoản
            của bạn tại trang web Jobsit.vn, bao gồm sơ yếu lý lịch, Thông tin
            cá nhân, thư xin việc, các công việc đã lưu, sẽ được đánh dấu là bị
            xóa và có thể bị xóa khỏi Cơ sở dữ liệu It Jobs và sẽ được gỡ bỏ từ
            bất kỳ khu vực chung nào trên trang web Jobsit.vn. Thông tin có thể
            tiếp tục được hiển thị trong một khoảng thời gian vì các trở ngại
            trong khi truyền tín hiệu xóa thông qua các máy chủ của Jobsit.vn
            hoặc do yêu cầu của các cơ quan chức năng liên quan. Ngoài ra, các
            bên thứ ba được phép giữ lại bản sao thông tin của bạn.{' '}
          </p>
          <p>
            It Jobs có quyền xỏa tài khoản và tất cả thông tin của bạn sau một
            thời gian dài không hoạt động.{' '}
          </p>
          <h5>5. TUYÊN BỐ VỀ QUYỀN SỞ HỮU TRÍ TUỆ </h5>
          <p>
            Bạn tuyên bố và đảm bảo rằng: (i) bạn sở hữu Nội dung mà bạn đăng
            lên hoặc thông qua Dịch vụ hay nói cách khác, bạn có quyền cấp các
            quyền và giấy phép được quy định trong các Điều khoản sử dụng này;
            (ii) việc đăng và sử dụng Nội dung trên hoặc thông qua Dịch vụ không
            vi phạm, chiếm đoạt hay xâm phạm các quyền của bất kỳ bên thứ ba
            nào, bao gồm nhưng không giới hạn ở quyền riêng tư, quyền công khai,
            bản quyền, nhãn hiệu thương mại và/hoặc quyền sở hữu trí tuệ khác;
            (iii) bạn đồng ý thanh toán tất cả tiền bản quyền tác giả, phí và
            bất kỳ khoản tiền nào khác còn nợ do Nội dung mà bạn đăng lên hoặc
            thông qua Dịch vụ; và (iv) bạn có quyền và năng lực pháp lý để tham
            gia vào các Điều khoản sử dụng này trong quyền hạn của bạn.{' '}
          </p>
          <p>
            Dịch vụ chứa nội dung mà It Jobs sở hữu hoặc cấp phép ("Nội dung It
            Jobs"). Nội dung It Jobs được bảo vệ bởi bản quyền, nhãn hiệu thương
            mại, bằng sáng chế, bí mật thương mại và các luật khác, đồng thời
            giữa bạn và It Jobs, It Jobs sở hữu và nắm giữ tất cả các quyền về
            Dịch vụ và Nội dung It Jobs. Bạn không được xóa, thay đổi hoặc che
            giấu bất kỳ thông báo nào về bản quyền, nhãn hiệu thương mại, nhãn
            hiệu dịch vụ hay quyền sở hữu khác được kết hợp với hay đi kèm Nội
            dung It Jobs và bạn không được sao chép, sửa đổi, điều chỉnh, chuẩn
            bị các sản phẩm phái sinh dựa trên, thực hiện, hiển thị, xuất bản,
            phân phối, truyền đi, phát, bán, cấp phép hoặc khai thác Nội dung It
            Jobs.{' '}
          </p>
          <p>
            Logo và tên It Jobs là các nhãn hiệu thương mại của It Jobs và không
            được sao chép, giả mạo hay sử dụng toàn bộ hoặc một phần khi chưa có
            sự cho phép trước bằng văn bản của It Jobs. Ngoài ra, tất cả các
            tiêu đề trang, đồ họa tùy chỉnh, biểu tượng nút và tập lệnh đều là
            nhãn hiệu dịch vụ, nhãn hiệu thương mại và/hoặc bao bì thương mại
            của It Jobs và không được sao chép, giả mạo hay sử dụng toàn bộ hoặc
            một phần khi chưa có sự cho phép trước bằng văn bản của It Jobs.{' '}
          </p>
          <p>
            Mặc dù mục đích của It Jobs là cung cấp Dịch vụ nhiều nhất có thể
            nhưng sẽ có trường hợp Dịch vụ có thể bị gián đoạn, bao gồm nhưng
            không giới hạn ở việc gián đoạn để bảo trì hoặc nâng cấp theo lịch
            trình, để sửa chữa khẩn cấp hay do lỗi của thiết bị và/hoặc liên kết
            viễn thông. Ngoài ra, It Jobs có quyền xóa bất kỳ Nội dung nào khỏi
            Dịch vụ vì bất kỳ lý do gì mà theo nhận định của mình, là vi phạm
            Điều Khoản này, vi phạm pháp luật, quy tắc hoặc quy định, có tính
            chất lăng mạ, gây rối, xúc phạm hoặc bất hợp pháp, hoặc vi phạm các
            quyền, hoặc nguy hại hoặc đe dọa sự an toàn của Người dủng của bất
            kỳ trang web nào thuộc Jobsit.vn. It Jobs có quyền trục xuất người
            dùng và ngăn chặn quyền truy cập sau đó của họ tới trang web
            Jobsit.vn và/hoặc sử dụng các dịch vụ It Jobs khi vi phạm Điều Khoản
            này hoặc vi phạm pháp luật, quy tắc hoặc quy định. It Jobs được phép
            thực hiện bất kỳ hành động nào liên quan đến Nội dung Người dùng khi
            tự xét thấy cần thiết hoặc thích hợp nếu It Jobs tin rằng Nội dung
            Người dùng có thể tạo ra trách nhiệm pháp lý cho It Jobs, gây thiệt
            hại đến thương hiệu It Jobs hoặc hình ảnh công cộng, hoặc dẫn đến
            việc It Jobs để mất người dùng. Nội dung bị xóa khỏi Dịch vụ có thể
            tiếp tục được It Jobs lưu trữ, bao gồm nhưng không giới hạn ở việc
            lưu trữ để tuân thủ một số nghĩa vụ pháp lý nhất định nhưng có thể
            không truy xuất được nếu không có lệnh hợp lệ của tòa án. It Jobs sẽ
            không chịu trách nhiệm pháp lý với bạn về bất kỳ sửa đổi, tạm ngừng
            hay gián đoạn Dịch vụ nào hoặc việc mất mát bất kỳ Nội dung nào. Bạn
            cũng xác nhận rằng Internet có thể không an toàn và rằng việc gửi
            Nội dung hoặc thông tin khác có thể không an toàn.{' '}
          </p>
          <p>
            It Jobs sẽ không chịu trách nhiệm với bất cứ thông tin đăng tải của
            bên thứ ba nào, cho dù với lý do nào, do bất cứ tổ chức nào đăng tải
            nội dung trên It Jobs. Tuy nhiên, It Jobs sẽ cố gắng sử dụng mọi
            biện pháp kiểm soát và hạn chế tối đa các trường hợp tin tuyển dụng
            lừa đảo, thông tin không đúng…. để bảo vệ Người Dùng.{' '}
          </p>
          <p>
            It Jobs không đại diện hoặc đảm bảo tính trung thực, chính xác, hoặc
            độ tin cậy của Nội dung Người dùng, các sản phẩm phái sinh từ Nội
            dung Người dùng, hoặc bất kỳ thông tin liên lạc khác được đăng bởi
            Người dùng cũng như không xác nhận bất kỳ ý kiến nào được thể hiện
            bởi Người dùng. Bạn thừa nhận rằng việc tin tưởng nào vào tài liệu
            được đăng bởi Người dùng khác là rủi ro của riêng bạn.{' '}
          </p>
          <h5>6. TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM </h5>
          <p>
            It Jobs không tuyên bố hay đảm bảo rằng dịch vụ sẽ không bị lỗi hay
            không bị gián đoạn; rằng các lỗi sẽ được khắc phục; hoặc rằng dịch
            vụ hoặc máy chủ cung cấp dịch vụ không bị nhiễm bất kỳ thành phần có
            hại nào, bao gồm nhưng không giới hạn ở vi-rút. It Jobs không đưa ra
            bất kỳ tuyên bố hay đảm bảo nào rằng thông tin (bao gồm mọi hướng
            dẫn) về dịch vụ chính xác, đầy đủ hoặc hữu ích. Bạn xác nhận rằng
            bạn tự chịu rủi ro khi sử dụng dịch vụ. It Jobs không đảm bảo rằng
            việc bạn sử dụng dịch vụ là hợp pháp trong bất kỳ khu vực pháp lý cụ
            thể nào và It Jobs từ chối đưa ra các bảo đảm đó một cách cụ thể.
            Một số khu vực pháp lý giới hạn hoặc không cho phép tuyên bố miễn
            trừ trách nhiệm về bảo đảm ngụ ý hay các bảo đảm khác, vì vậy tuyên
            bố miễn trừ trách nhiệm trên có thể không áp dụng cho bạn trong phạm
            vi luật pháp của khu vực pháp lý đó áp dụng cho bạn và các điều
            khoản sử dụng này.{' '}
          </p>
          <p>
            Bằng cách truy cập hay sử dụng dịch vụ, bạn tuyên bố và bảo đảm rằng
            hoạt động của mình là hợp pháp trong mọi khu vực pháp lý nơi bạn
            truy cập hay sử dụng dịch vụ.{' '}
          </p>
          <p>
            It Jobs không xác nhận nội dung và từ chối cụ thể bất kỳ trách nhiệm
            hay trách nhiệm pháp lý nào đối với bất kỳ cá nhân hay tổ chức nào
            về mọi mất mát, thiệt hại (cho dù thực sự, do hậu quả, do trừng phạt
            hoặc bất kỳ điều gì khác), thương tích, khiếu nại, trách nhiệm pháp
            lý hay nguyên nhân khác dưới mọi hình thức hoặc đặc điểm dựa trên
            hoặc do bất kỳ nội dung nào.{' '}
          </p>
          <h5>7. GIỚI HẠN TRÁCH NHIỆM PHÁP LÝ </h5>
          <p>
            Trong mọi tình huống, It Jobs sẽ không chịu trách nhiệm pháp lý với
            bạn về bất kỳ mất mát hay thiệt hại nào dưới mọi hình thức (bao gồm
            nhưng không giới hạn ở bất kỳ mất mát hay thiệt hại trực tiếp, gián
            tiếp, kinh tế, cảnh báo, đặc biệt, do trừng phạt, ngẫu nhiên hoặc do
            hậu quả nào) có liên quan trực tiếp hoặc gián tiếp đến: (a) dịch vụ;
            (b) nội dung It Jobs; (c) nội dung người dùng; (d) việc bạn sử dụng,
            không thể sử dụng hoặc hiệu quả của dịch vụ; (e) mọi hành động được
            thực hiện có liên quan đến việc điều tra của It Jobs hoặc cơ quan
            thực thi pháp luật về việc sử dụng dịch vụ của bạn hoặc bất kỳ bên
            nào khác; (f) bất kỳ hành động nào được thực hiện có liên quan đến
            chủ sở hữu bản quyền hoặc quyền sở hữu trí tuệ khác; (g) mọi lỗi
            hoặc thiếu sót trong hoạt động của dịch vụ; hoặc (h) mọi thiệt hại
            đối với mọi máy tính, thiết bị di động, thiết bị hoặc công nghệ khác
            của người dùng, bao gồm nhưng không giới hạn ở thiệt hại do bất kỳ
            hành vi vi phạm bảo mật nào hoặc do bất kỳ vi-rút, lỗi, giả mạo,
            gian lận, lỗi, thiếu sót, gián đoạn, khiếm khuyết, trì hoãn quá
            trình hoạt động hoặc truyền đi, lỗi mạng hay dòng máy tính, mọi sự
            cố kỹ thuật khác hoặc trục trặc khác, bao gồm nhưng không giới hạn ở
            thiệt hại do mất lợi nhuận, mất tín nhiệm, mất dữ liệu, ngừng việc,
            độ chính xác của kết quả hoặc lỗi hay trục trặc máy tính, ngay cả
            khi có thể dự đoán được hoặc It Jobs đã được thông báo hay lẽ ra
            phải biết về khả năng xảy ra các thiệt hại đó, cho dù theo hợp đồng,
            do sơ ý, trách nhiệm pháp lý nghiêm ngặt hoặc sai lầm cá nhân (bao
            gồm, nhưng không giới hạn ở nguyên nhân một phần hoặc toàn bộ do sơ
            ý, thiên tai, lỗi viễn thông, lấy cắp hay hủy hoại dịch vụ). Trong
            mọi trường hợp, It Jobs không chịu trách nhiệm pháp lý với bạn hoặc
            bất kỳ ai khác về mất mát, thiệt hại hoặc thương tích, bao gồm nhưng
            không giới hạn ở thương tích cá nhân hoặc tử vong.{' '}
          </p>
          <h5>8. GIẢI QUYẾT TRANH CHẤP </h5>
          <p>
            Bất kỳ tranh chấp phát sinh trong quá trình sử dụng dịch vụ của It
            Jobs sẽ được giải quyết theo pháp luật hiện hành của nước Cộng hòa
            xã hội chủ nghĩa Việt Nam.{' '}
          </p>
          <p>
            Bất kỳ khiếu nại nào phát sinh trong quá sử dụng sản phẩm phải được
            gửi đến It Jobs ngay sau khi xảy ra sự kiện phát sinh khiếu nại:{' '}
          </p>
          <p>
            Địa chỉ: Trụ sở: Lầu 8, Toà Nhà Pearl Plaza, 561A đường Điện Biên
            Phủ, Phường 25, Quận Bình Thạnh, Thành Phố Hồ Chí Minh{' '}
          </p>
          <p>
            Văn phòng: A005 Tầng trệt Chung cư Linh Đông, 1164 đường Phạm Văn
            Đồng, P. Linh Đông, TP Thủ Đức, Thành Phố Hồ Chí Minh{' '}
          </p>
          <p>
            <span>Tel: 0919 365 363</span>{' '}
            <span>Email: tuyendung@r2s.com.vn </span>
          </p>
          <p>
            It Jobs sẽ căn cứ từng trường hợp cụ thể để có phương án giải quyết
            cho phù hợp. Khi thực hiện quyền khiếu nại, người khiếu nại có nghĩa
            vụ cung cấp các giấy tờ, bằng chứng, căn cứ có liên quan đến việc
            khiếu nại và phải chịu trách nhiệm về nội dung khiếu nại, giấy tờ,
            bằng chứng, căn cứ do mình cung cấp theo quy định pháp luật.{' '}
          </p>
          <p>
            It Jobs chỉ hỗ trợ, giải quyết khiếu nại, tố cáo của Người Dùng
            trong trường hợp bạn đã ghi đầy đủ, trung thực và chính xác thông
            tin khi đăng ký tài khoản.{' '}
          </p>
          <p>
            Đối với tranh chấp giữa Người Dùng với nhau, hoặc tranh chấp với Bên
            Thứ Ba, có thể It Jobs sẽ gửi thông tin liên hệ cho các đối tượng
            tranh chấp để các bên tự giải quyết hoặc It Jobs sẽ căn cứ vào tình
            hình thực tế để giải quyết. Theo đó, It Jobs sẽ bảo vệ quyền lợi tối
            đa có thể cho Người Dùng hợp pháp và chính đáng.{' '}
          </p>
          <p>
            Người Dùng đồng ý bảo vệ, bồi hoàn và loại trừ It Jobs khỏi những
            nghĩa vụ pháp lý, tố tụng, tổn thất, chi phí bao gồm nhưng không
            giới hạn án phí, chi phí luật sư, chuyên gia tư vấn có liên quan đến
            việc giải quyết hoặc phát sinh từ sự vi phạm của Người Dùng trong
            quá trình sử dụng sản phẩm.
          </p>
          <p>
            Nếu tranh chấp không được giải quyết trong vòng sáu mươi (60) ngày
            kể từ ngày một Bên thông báo cho Bên còn lại bằng văn bản về việc
            phát sinh tranh chấp thì một trong các Bên có quyền đưa vụ việc ra
            giải quyết tại tòa án có thẩm quyền tại TP Hà Nội theo quy định của
            pháp luật, Bên thua kiện sẽ phải chịu toàn bộ các chi phí tố tụng
            tại tòa án.{' '}
          </p>
          <h5>9. HIỆU LỰC THỎA THUẬN CỦA HỢP ĐỒNG </h5>
          <p>
            Các điều khoản quy định tại Quy định sử dụng này có thể được cập
            nhật, chỉnh sửa bất cứ lúc nào mà không cần phải thông báo trước tới
            người sử dụng. It Jobs sẽ công bố rõ trên Website, về những thay
            đổi, bổ sung đó.{' '}
          </p>
          <p>
            Trong trường hợp một hoặc một số điều khoản Quy định sử dụng này
            xung đột với các quy định của luật pháp và bị Tòa án tuyên là vô
            hiệu, điều khoản đó sẽ được chỉnh sửa cho phù hợp với quy định pháp
            luật hiện hành, và phần còn lại của Quy định sử dụng vẫn giữ nguyên
            giá trị.{' '}
          </p>
          <p>
            Thỏa thuận này có giá trị như Hợp Đồng. Người Dùng hiểu rằng, đây là
            hợp đồng điện tử, Giá trị pháp lý của hợp đồng điện tử không thể bị
            phủ nhận chỉ vì hợp đồng đó được thể hiện dưới dạng thông điệp dữ
            liệu theo Pháp Luật về Giao Dịch Điện Tử. Bằng cách nhấn vào nút
            “Tôi đồng ý”, Người Dùng hoàn toàn đồng ý và đã hiểu các điều khoản
            trong Hợp Đồng này và Hợp Đồng có hiệu lực kề từ thời điểm này. Nếu
            vi phạm các Điều khoản này, bạn đồng ý chịu hoàn toàn trách nhiệm và
            bồi thường thiệt hại (Nếu có) với It Jobs.{' '}
          </p>
          <h5>THÔNG TIN LIÊN LẠC </h5>
          <p>
            Nếu bạn có câu hỏi về Điều khoản sử dụng này, vui lòng gửi email tới
            địa chỉ (…) để được giải đáp nhanh nhất.{' '}
          </p>
        </div>
      }
    />
  );
};

export default TermsOfServices;
