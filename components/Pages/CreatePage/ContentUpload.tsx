import Image from "../../../shared/Image"
import MediaPicker from "../../../shared/MediaPicker"

const ContentUpload = () => (
  <MediaPicker hookToForm name="content">
    {({ files }) => (
      <button
        type="button"
        className="border border-gray_3 p-[40px] rounded-[14px] w-full md:w-[300px] aspect-[1/1]
              flex flex-col items-center justify-center"
      >
        <Image
          link={files ? URL.createObjectURL(files[0]) : "/images/upload-imagination.svg"}
          blurLink={files ? URL.createObjectURL(files[0]) : "/images/upload-imagination.svg"}
          containerClasses="w-[80px] aspect-[1/1]"
          alt="not found icon"
        />
        <p
          className="text-[12px]
              text-center"
        >
          Drag and drop or choose a file. Image, video, audio, PDF, GLB and ZIP supported. Max Size
          2GB.
        </p>
      </button>
    )}
  </MediaPicker>
)

export default ContentUpload
