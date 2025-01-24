import {useState} from 'react';

import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {editProfile} from '../../apis/user/editProfileApi';
import {InputTextBox} from '../common/inputText';

export function EditProfileModal({
  onClose,
  image,
  companyName,
}: {
  onClose: () => void;
  image: string;
  companyName: string;
}) {
  const [img, setImg] = useState(image);
  const [company, setCompany] = useState(companyName);
  const [file, setFile] = useState<File | null>(null);

  const route = useRouter();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('companyName', company);

      if (file) {
        formData.append('image', file); // 업로드된 파일
      }

      await editProfile(formData);

      route.push('/mypage');
      route.refresh();
      onClose();
    } catch (error) {
      console.error('프로필 정보 변경 중 오류 발생:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
      setImg(URL.createObjectURL(uploadedFile));
    }
  };
  return (
    <div className="absolute z-50 flex size-full items-center justify-center">
      <div className="flex h-[328px] w-[343px] items-center justify-center rounded-md bg-white sm:w-[520px]">
        <div className="flex h-[280px] w-[295px] flex-col gap-[24px] sm:w-[472px]">
          <p className="h-[28px] w-full text-lg font-semibold">프로필 수정하기</p>

          <div className="relative size-[56px] bg-none">
            <Image
              src={img || 'icons/defaultProfileIcon.svg'}
              alt="프로필 이미지"
              layout="fill"
              className="rounded-full"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <Image
                src="icons/editIcon.svg"
                unoptimized
                alt="수정 아이콘"
                width={18}
                height={18}
              />
            </button>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div className="h-[80px] w-full">
            <p>회사</p>
            <InputTextBox
              placeholder={`${companyName}`}
              value={company}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCompany(e.target.value)}
              height={44}
            />
          </div>
          <div className="flex h-[44px] w-full gap-[16px]">
            <button
              type="button"
              className="flex h-full w-[228px] items-center justify-center rounded-md border-2 border-orange-600 font-semibold text-orange-600"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="submit"
              className={`flex h-full w-[228px] items-center justify-center rounded-md ${img === image || company === companyName ? 'bg-orange-600' : 'bg-orange-600'} font-semibold text-white`}
              onClick={handleSubmit}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
