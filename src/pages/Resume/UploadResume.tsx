import { useRef, useState } from "react";
import { UploadCloud, FileText, X, Loader2 } from "lucide-react";
import axiosInstance from "../../api/axios";

const UploadResume = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);


  // Select Resume File
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;


    // Maximum size 5MB
    if (file.size > 5 * 1024 * 1024) {

      alert("File size should be less than 5MB");

      e.target.value = "";

      return;
    }


    // Allowed file types
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];


    if (!allowedTypes.includes(file.type)) {

      alert("Only PDF, DOC and DOCX files are allowed");

      e.target.value = "";

      return;
    }


    setResume(file);
  };



  // Remove Selected Resume
  const removeResume = () => {

    setResume(null);

    setUploadProgress(0);


    if(fileInputRef.current){

      fileInputRef.current.value = "";

    }

  };



  // Upload Resume
  const handleSubmit = async(
    e: React.FormEvent<HTMLFormElement>
  )=>{

    e.preventDefault();


    if(!resume){

      alert("Please select resume");

      return;

    }


    try{

      setLoading(true);


      const formData = new FormData();


      // IMPORTANT:
      // backend upload.single("resume")
      formData.append(
        "resume",
        resume
      );



      const response = await axiosInstance.post(
        "/resume/upload",
        formData,
        {

          headers:{

            "Content-Type":"multipart/form-data",

          },


          onUploadProgress:(progressEvent)=>{

            if(progressEvent.total){

              const percent =
                Math.round(
                  (progressEvent.loaded * 100) /
                  progressEvent.total
                );


              setUploadProgress(percent);

            }

          }

        }
      );



      console.log(
        "UPLOAD SUCCESS:",
        response.data
      );


      alert(
        "Resume uploaded successfully"
      );


      removeResume();



    }catch(error:any){


      console.error(
        "Resume upload error:",
        error
      );


      console.error(
        "Server response:",
        error.response?.data
      );


      alert(

        error.response?.data?.message ||
        "Resume upload failed"

      );


    }finally{

      setLoading(false);

    }

  };




  return (

    <div className="max-w-2xl mx-auto py-12 px-6">


      <h1 className="
        text-4xl
        font-black
        text-slate-900
        mb-2
      ">
        Upload Resume
      </h1>


      <p className="
        text-slate-500
        mb-8
      ">
        Upload your latest resume
      </p>




      <div className="
        bg-white
        rounded-3xl
        shadow
        border
        p-8
      ">


        <form onSubmit={handleSubmit}>


          <div

            onClick={()=>
              fileInputRef.current?.click()
            }

            className="
              border-2
              border-dashed
              rounded-3xl
              p-12
              text-center
              cursor-pointer
              hover:border-blue-500
              transition
            "

          >


            <UploadCloud
              size={45}
              className="
                mx-auto
                text-blue-600
                mb-4
              "
            />


            <h2 className="
              font-bold
              text-lg
            ">
              Select Resume
            </h2>


            <p className="
              text-sm
              text-gray-500
            ">
              PDF, DOC, DOCX (Max 5MB)
            </p>



            <input

              ref={fileInputRef}

              type="file"

              accept=".pdf,.doc,.docx"

              onChange={handleFileChange}

              hidden

            />


          </div>




          {
            resume && (

              <div className="
                mt-6
                bg-gray-50
                rounded-xl
                p-4
                flex
                justify-between
                items-center
              ">


                <div className="
                  flex
                  items-center
                  gap-3
                ">


                  <FileText
                    className="text-red-500"
                  />


                  <span className="
                    font-medium
                    truncate
                    max-w-xs
                  ">

                    {resume.name}

                  </span>


                </div>



                <button

                  type="button"

                  onClick={removeResume}

                  className="
                    text-red-500
                  "

                >

                  <X/>

                </button>


              </div>

            )
          }





          {
            uploadProgress > 0 && (

              <p className="
                mt-4
                text-sm
                text-blue-600
              ">

                Uploading: {uploadProgress}%

              </p>

            )
          }






          <button

            type="submit"

            disabled={
              loading ||
              !resume
            }


            className="
              w-full
              mt-8
              bg-blue-600
              text-white
              py-4
              rounded-xl
              font-bold
              disabled:bg-gray-300
              flex
              justify-center
              items-center
              gap-2
            "

          >


            {
              loading ? (

                <>
                  <Loader2
                    className="animate-spin"
                  />

                  Uploading...

                </>

              ) : (

                "Save Resume"

              )

            }


          </button>




        </form>



      </div>


    </div>

  );

};


export default UploadResume;