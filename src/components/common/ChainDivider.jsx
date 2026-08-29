export default function ChainDivider({ color = '#C4592E', background = '#FBF3E7' }) {
  return (
    <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, background }}>
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '28px', display: 'block' }}
      >
        <path
          d="M0,20 Q15,0 30,20 T60,20 T90,20 T120,20 T150,20 T180,20 T210,20 T240,20 T270,20 T300,20 T330,20 T360,20 T390,20 T420,20 T450,20 T480,20 T510,20 T540,20 T570,20 T600,20 T630,20 T660,20 T690,20 T720,20 T750,20 T780,20 T810,20 T840,20 T870,20 T900,20 T930,20 T960,20 T990,20 T1020,20 T1050,20 T1080,20 T1110,20 T1140,20 T1170,20 T1200,20"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
