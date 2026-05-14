import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
}

const brand = {
  pink: '#F83A7A',
  pinkDeep: '#9D003A',
  purple: '#7E34D6',
  purpleDeep: '#351061',
  teal: '#08B9D6',
  tealDeep: '#046C82',
  cream: '#FFF2DE',
  dark: '#271120',
}

const pop = (frame, start, fps, damping = 11) =>
  spring({
    frame: frame - start,
    fps,
    config: { damping, stiffness: 150, mass: 0.72 },
  })

const fade = (frame, start, end) =>
  interpolate(frame, [start, end], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })

const out = (frame, start, end) =>
  interpolate(frame, [start, end], [1, 0], {
    ...clamp,
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  })

const BubbleWord = ({ compact = false }) => (
  <div
    style={{
      fontFamily: '"Baloo 2", Arial, sans-serif',
      fontWeight: 900,
      fontSize: compact ? 102 : 128,
      lineHeight: 0.86,
      letterSpacing: 0,
      textAlign: 'center',
      filter: 'drop-shadow(12px 22px 20px rgba(53,16,97,0.36))',
    }}
  >
    <span style={bubbleText('#fff3f7', '#ff4f91', '#760022')}>Pupp</span>
    <span style={bubbleText('#e0faff', '#10c8e8', '#034a68')}>y</span>
    <br />
    <span style={bubbleText('#f5deff', '#8d42f0', '#2c075f')}>Whippies</span>
  </div>
)

const bubbleText = (top, mid, bottom) => ({
  background: `linear-gradient(180deg, ${top} 0%, ${mid} 48%, ${bottom} 100%)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextStroke: `5px ${brand.cream}`,
  textShadow: `0 8px 0 ${bottom}, 0 16px 0 rgba(53,16,97,0.72)`,
})

const SceneShell = ({ children, tint = 0 }) => {
  const frame = useCurrentFrame()
  const drift = interpolate(frame, [0, 450], [-40, 40], clamp)

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 50% 18%, rgba(255,255,255,0.9) 0 9%, transparent 32%), linear-gradient(135deg, #ffd6c4 0%, #ffeef8 42%, #ecd4ff 70%, #d4f8ff 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 60,
          border: '8px dashed rgba(248,58,122,0.24)',
          borderRadius: '46% 54% 49% 51% / 52% 44% 56% 48%',
          transform: `translateX(${drift}px) rotate(${tint * 3}deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.20) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.16) 1px, transparent 1px)',
          backgroundSize: '62px 62px',
          opacity: 0.28,
        }}
      />
      <Img
        src={staticFile('logo-transparent.png')}
        style={{
          position: 'absolute',
          top: 34,
          left: 34,
          width: 124,
          height: 124,
          borderRadius: 0,
          objectFit: 'contain',
          filter: 'drop-shadow(0 18px 28px rgba(53,16,97,0.22))',
          opacity: 0.96,
          transform: `rotate(${Math.sin(frame / 26) * 2}deg)`,
          zIndex: 4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 62,
          right: 48,
          padding: '12px 22px',
          borderRadius: 999,
          background: 'rgba(255,253,249,0.72)',
          border: `4px solid ${brand.cream}`,
          color: brand.purpleDeep,
          fontFamily: '"Nunito", Arial, sans-serif',
          fontWeight: 1000,
          fontSize: 25,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          boxShadow: '0 10px 22px rgba(53,16,97,0.12)',
          zIndex: 4,
        }}
      >
        Small Batch
      </div>
      {children}
    </AbsoluteFill>
  )
}

const FruitBurst = ({ start = 0 }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const fruits = [
    ['#ff3d7d', 130, 210, 86],
    ['#7e34d6', 855, 235, 74],
    ['#ffbf3f', 780, 780, 62],
    ['#08b9d6', 185, 735, 58],
    ['#ff6a9e', 500, 138, 46],
    ['#88d957', 920, 540, 54],
  ]

  return fruits.map(([color, x, y, size], index) => {
    const s = pop(frame, start + index * 3, fps, 9)
    const float = Math.sin((frame + index * 22) / 18) * 12

    return (
      <div
        key={`${color}-${x}`}
        style={{
          position: 'absolute',
          left: x,
          top: y + float,
          width: size,
          height: size,
          borderRadius: index % 2 ? '50%' : '58% 42% 52% 48%',
          background: `linear-gradient(180deg, #fff8, ${color})`,
          border: `6px solid ${brand.cream}`,
          boxShadow: `0 10px 0 ${brand.pinkDeep}44, 0 22px 28px rgba(53,16,97,0.22)`,
          transform: `translate(-50%, -50%) scale(${s}) rotate(${index * 18 + frame * 0.4}deg)`,
          opacity: fade(frame, start, start + 15),
        }}
      />
    )
  })
}

const TreatCup = ({ start = 0, x = 540, y = 600, scale = 1 }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = pop(frame, start, fps, 8)
  const bob = Math.sin((frame - start) / 12) * 8

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + bob,
        width: 260,
        height: 240,
        transform: `translate(-50%, -50%) scale(${s * scale}) rotate(${interpolate(frame, [start, start + 60], [-8, 3], clamp)}deg)`,
        filter: 'drop-shadow(0 24px 22px rgba(53,16,97,0.28))',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 46,
          bottom: 16,
          width: 170,
          height: 128,
          borderRadius: '30px 30px 58px 58px',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.5) 0 18%, transparent 19%), linear-gradient(135deg, #f83a7a, #7e34d6 70%, #08b9d6)',
          border: `10px solid ${brand.cream}`,
          boxShadow: 'inset 0 -24px 0 rgba(53,16,97,0.2)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 34,
          top: 22,
          width: 194,
          height: 128,
          borderRadius: '48% 52% 44% 56% / 58% 42% 58% 42%',
          background: 'linear-gradient(180deg, #fffdf9 0%, #ffe9f2 100%)',
          border: `10px solid ${brand.cream}`,
        }}
      />
      <div style={dotStyle('#ff3d7d', 10, 86, 72)} />
      <div style={dotStyle('#7e34d6', 192, 60, 62)} />
      <div style={dotStyle('#ffbf3f', 170, 128, 42)} />
    </div>
  )
}

const dotStyle = (color, left, top, size) => ({
  position: 'absolute',
  left,
  top,
  width: size,
  height: size,
  borderRadius: '50%',
  background: `linear-gradient(180deg, #fff8, ${color})`,
  border: `6px solid ${brand.cream}`,
})

const Headline = ({ children, top, start, size = 76 }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = pop(frame, start, fps, 10)
  const opacity = fade(frame, start, start + 12)

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 90,
        right: 90,
        textAlign: 'center',
        opacity,
        transform: `scale(${0.86 + s * 0.14})`,
        fontFamily: '"Baloo 2", Arial, sans-serif',
        fontWeight: 900,
        fontSize: size,
        lineHeight: 0.95,
        color: brand.dark,
        textShadow: '0 5px 0 rgba(255,255,255,0.92), 0 14px 22px rgba(53,16,97,0.2)',
      }}
    >
      {children}
    </div>
  )
}

const Pill = ({ children, top, start }) => {
  const frame = useCurrentFrame()

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: '50%',
        transform: `translateX(-50%) translateY(${interpolate(frame, [start, start + 18], [24, 0], clamp)}px)`,
        opacity: fade(frame, start, start + 15),
        minWidth: 560,
        textAlign: 'center',
        padding: '18px 34px',
        borderRadius: 999,
        color: '#fff',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.42) 0 20%, transparent 21%), linear-gradient(135deg, #cf0054 0%, #6a20bd 70%, #046c82 100%)',
        border: `7px solid ${brand.cream}`,
        boxShadow: `0 14px 0 ${brand.pinkDeep}, 0 30px 34px rgba(53,16,97,0.25)`,
        fontFamily: '"Baloo 2", Arial, sans-serif',
        fontWeight: 900,
        fontSize: 46,
      }}
    >
      {children}
    </div>
  )
}

export const PuppyWhippiesAd = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scene1Out = out(frame, 128, 150)
  const scene2In = fade(frame, 138, 160)
  const scene2Out = out(frame, 268, 292)
  const scene3In = fade(frame, 282, 304)

  const logoPop = pop(frame, 10, fps, 9)
  const logoSpin = interpolate(frame, [0, 110], [-8, 4], clamp)
  const finalLogo = pop(frame, 306, fps, 10)

  return (
    <SceneShell tint={0.5}>
      <AbsoluteFill style={{ opacity: scene1Out }}>
        <FruitBurst start={8} />
        <Img
          src={staticFile('logo-transparent.png')}
          style={{
            position: 'absolute',
            top: 96,
            left: 346,
            width: 388,
            height: 388,
            borderRadius: 0,
            objectFit: 'contain',
            transform: `scale(${logoPop}) rotate(${logoSpin}deg)`,
            filter: 'drop-shadow(0 34px 42px rgba(53,16,97,0.32))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 510,
            left: 0,
            right: 0,
            opacity: fade(frame, 28, 48),
            transform: `translateY(${interpolate(frame, [20, 58], [80, 0], clamp)}px)`,
          }}
        >
          <BubbleWord />
        </div>
        <Headline top={780} start={56} size={62}>
          Whipped treat cups made for dog-loving families.
        </Headline>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: scene2In * scene2Out }}>
        <FruitBurst start={148} />
        <div
          style={{
            position: 'absolute',
            left: 140,
            right: 140,
            top: 380,
            height: 260,
            borderRadius: 999,
            background:
              'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.72), rgba(255,255,255,0) 62%)',
            filter: 'blur(2px)',
          }}
        />
        <TreatCup start={150} x={318} y={580} scale={0.86} />
        <TreatCup start={166} x={542} y={522} scale={1.06} />
        <TreatCup start={182} x={764} y={590} scale={0.86} />
        <Headline top={126} start={142} size={78}>
          Fruity. Fluffy. Delicious.
        </Headline>
        <Pill top={812} start={198}>Pick a pilot flavor</Pill>
        <div
          style={{
            position: 'absolute',
            top: 910,
            left: 110,
            right: 110,
            textAlign: 'center',
            opacity: fade(frame, 220, 238),
            color: '#51225f',
            fontFamily: '"Nunito", Arial, sans-serif',
            fontSize: 35,
            fontWeight: 900,
            lineHeight: 1.18,
          }}
        >
          We confirm ingredients, serving notes, and Las Vegas area availability first.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: scene3In }}>
        <FruitBurst start={300} />
        <Img
          src={staticFile('logo-transparent.png')}
          style={{
            position: 'absolute',
            top: 112,
            left: 368,
            width: 344,
            height: 344,
            borderRadius: 0,
            objectFit: 'contain',
            transform: `scale(${finalLogo})`,
            filter: 'drop-shadow(0 38px 46px rgba(53,16,97,0.34))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 468,
            left: 0,
            right: 0,
            opacity: fade(frame, 318, 338),
          }}
        >
          <BubbleWord compact />
        </div>
        <Headline top={684} start={334} size={56}>
          Request your sample cup.
        </Headline>
        <Pill top={792} start={358}>puppywhippies.com</Pill>
        <div
          style={{
            position: 'absolute',
            top: 944,
            left: 80,
            right: 80,
            textAlign: 'center',
            color: '#5a235f',
            opacity: fade(frame, 382, 400),
            fontFamily: '"Nunito", Arial, sans-serif',
            fontSize: 31,
            fontWeight: 900,
          }}
        >
          Small-batch requests. Flavor details before pickup or delivery.
        </div>
      </AbsoluteFill>
    </SceneShell>
  )
}
