import { Check, Mail, Zap, Sparkles, Star } from 'lucide-react'
import { plans } from '../data'

function FeatureItem({ label }: { label: string }) {
  return (
    <li className="pricing-feature-item" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.75rem', 
      padding: '0.65rem 0',
      fontSize: '0.95rem'
    }}>
      <div className="check-icon" style={{ 
        width: '1.5rem', 
        height: '1.5rem', 
        borderRadius: '50%', 
        background: 'hsla(var(--success), 0.1)', 
        color: 'hsl(var(--success))',
        display: 'grid',
        placeItems: 'center'
      }}>
        <Check size={12} strokeWidth={3} />
      </div>
      <span style={{ fontWeight: 500 }}>{label}</span>
    </li>
  )
}

export function PricingPage() {
  return (
    <div className="container app-page" style={{ paddingBottom: '8rem' }}>
      <section className="page-hero compact centered" style={{ paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="eyebrow" style={{ 
          background: 'hsla(var(--primary), 0.1)', 
          color: 'hsl(var(--primary))',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-full)',
          width: 'fit-content',
          margin: '0 auto 1.5rem',
          fontWeight: 700,
          fontSize: '0.85rem'
        }}>
          <Zap size={14} style={{ marginRight: '0.5rem' }} />
          Mở rộng trải nghiệm của bạn
        </div>
        <h1 className="page-title" style={{ fontSize: '3.5rem', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>Gói dịch vụ cao cấp</h1>
        <p className="page-subtitle" style={{ 
          fontSize: '1.25rem', 
          lineHeight: 1.6, 
          color: 'hsl(var(--muted-foreground))',
          maxWidth: '600px',
          margin: '0 auto' 
        }}>
          Khám phá những tính năng mạnh mẽ dành riêng cho người chơi cầu lông chuyên nghiệp và CLB.
        </p>
      </section>

      <div className="pricing-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '2rem',
        alignItems: 'stretch'
      }}>
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`pricing-card glass${plan.featured ? ' featured' : ''}`}
            style={{ 
              borderRadius: 'var(--radius-2xl)', 
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              borderWidth: plan.featured ? '2.5px' : '1.5px',
              borderColor: plan.featured ? 'hsla(var(--primary), 0.4)' : 'var(--border)',
              background: plan.featured ? 'var(--card)' : 'hsla(var(--card), 0.6)',
              boxShadow: plan.featured ? 'var(--shadow-lg)' : 'var(--shadow-soft)'
            }}
          >
            {plan.featured && (
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--violet)))',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '0 0 0 1.25rem',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                zIndex: 1
              }}>
                <Sparkles size={11} fill="white" style={{ marginRight: '0.35rem' }} /> PHỔ BIẾN NHẤT
              </div>
            )}
            
            <div className="pricing-header" style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{plan.name}</h3>
              <div className="price-tag" style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <strong className="price" style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{plan.price}</strong>
                <span className="price-period" style={{ fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))' }}>
                  {plan.priceNum > 0 ? '/ tháng' : ''}
                </span>
              </div>
            </div>
            
            <p className="plan-description" style={{ 
              fontSize: '0.95rem', 
              color: 'hsl(var(--muted-foreground))',
              lineHeight: 1.5,
              marginBottom: '2rem' 
            }}>{plan.description}</p>

            <ul className="plan-features" style={{ listStyle: 'none', padding: 0, marginBottom: '3rem', flex: 1 }}>
              {plan.features.map((feature) => (
                <FeatureItem key={feature} label={feature} />
              ))}
            </ul>

            <button
              className={`cta-button ${plan.featured ? 'primary' : 'secondary'}`}
              type="button"
              style={{ width: '100%', fontSize: '1.1rem' }}
            >
              {plan.cta}
            </button>
          </article>
        ))}
      </div>

      <div className="pricing-faq" style={{ marginTop: '8rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>Câu hỏi thường gặp</h2>
        <div className="faq-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '2.5rem' 
        }}>
          {[
            { q: "Tôi có thể thay đổi gói sau khi đăng ký?", a: "Có, bạn có thể nâng cấp hoặc hạ cấp bất kỳ lúc nào thông qua phần Cài đặt của bạn." },
            { q: "Thanh toán được thực hiện như thế nào?", a: "SmashMate hỗ trợ đa dạng phương thức thanh toán: MoMo, VNPay và chuyển khoản ngân hàng." },
            { q: "Có thể dùng thử gói Plus trước không?", a: "Tất cả tài khoản mới đều có thể dùng thử miễn phí gói Plus trong vòng 7 ngày." },
            { q: "Dành cho doanh nghiệp hoặc giải đấu?", a: "Vui lòng liên hệ trực tiếp với đội ngũ hỗ trợ để nhận mức giá ưu đãi và các giải pháp tùy chỉnh." }
          ].map(faq => (
            <div key={faq.q} className="faq-item glass" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', fontWeight: 700 }}>{faq.q}</h4>
              <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="support-cta glass" style={{ 
        marginTop: '6rem', 
        padding: '3.5rem', 
        borderRadius: 'var(--radius-xl)', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '3rem',
        background: 'linear-gradient(to right, hsla(var(--primary), 0.08), hsla(var(--violet), 0.08))',
        borderWidth: '2px'
      }}>
        <div className="cta-icon" style={{ 
          width: '5rem', 
          height: '5rem', 
          borderRadius: '50%', 
          background: 'white', 
          color: 'hsl(var(--primary))',
          display: 'grid',
          placeItems: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}><Mail size={32} /></div>
        <div className="cta-content" style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Bạn cần thêm sự hỗ trợ?</h3>
          <p style={{ fontSize: '1.1rem', color: 'hsl(var(--muted-foreground))' }}>
            Nhóm tư vấn SmashMate luôn sẵn sàng giúp bạn chọn gói dịch vụ phù hợp nhất.
          </p>
        </div>
        <button className="cta-button primary" style={{ padding: '0.85rem 2.5rem' }}>Liên hệ ngay</button>
      </div>
    </div>
  )
}
