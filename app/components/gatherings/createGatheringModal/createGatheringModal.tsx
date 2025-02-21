import {CreateGatheringForm} from './form/createGatheringForm';

interface CreateGatheringModalProps {
  onClose: () => void;
}
export function CreateGatheringModal({onClose}: CreateGatheringModalProps) {
  return (
    <div className="fixed inset-0 z-30">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 w-full max-w-[375px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-4 pb-3 pt-6 tablet:max-w-[520px] tablet:p-6">
        {/* Modal header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-semibold">모임 만들기</h2>
          <button type="button" onClick={onClose} className="text-[#98A2B3] hover:text-gray-600">
            ✕
          </button>
        </div>
        {/* Modal content */}
        <CreateGatheringForm onClose={onClose} />
      </div>
    </div>
  );
}
