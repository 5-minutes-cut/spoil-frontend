type FeatureCardProps = {
  icon: string;
  title: string;
  desc: string;
  badgeBg: string;
};

export default function FeatureCard({
  icon,
  title,
  desc,
  badgeBg,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-bg-white p-5 shadow-card">
      <div
        className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${badgeBg}`}
      >
        <img src={icon} alt="설명 아이콘" className="h-5 w-5" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-gray-800">{title}</h3>
      <p className="text-sm leading-6 text-gray-700">{desc}</p>
    </div>
  );
}

export type { FeatureCardProps };
