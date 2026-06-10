import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// Fabric.js needs to be client-side only
const DesignEditor = dynamic(() => import('@/components/customizer/DesignEditor'), { 
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-offWhite">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brandBlue"></div>
    </div>
  )
});

export default function CustomizePage({ params }: { params: { locale: string, templateId?: string } }) {
  const t = useTranslations('Common');
  const templateId = params.templateId;

  return (
    <div className="h-screen w-full overflow-hidden">
      <DesignEditor templateId={templateId} />
    </div>
  );
}
