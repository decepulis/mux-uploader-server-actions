"use client";

import { useState } from "react";
import MuxUploader from "@mux/mux-uploader-react";
import { saveVideoToDb } from "./actions";
import FormStatusButton from "./pending-button";

type FormProps = {
  uploadId: string;
  endpoint: string;
};
export default function Form({ uploadId, endpoint }: FormProps) {
  const [uploaded, setUploaded] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setMessage(null);
        const response = await saveVideoToDb(formData);
        if (response?.error) setMessage(response.error);
      }}
    >
      <MuxUploader endpoint={endpoint} onSuccess={() => setUploaded(true)} />
      <input type="hidden" name="upload" id="upload" defaultValue={uploadId} />
      <label htmlFor="title">Title</label>
      <input required type="text" name="title" id="title" />
      <FormStatusButton disabled={!uploaded}>Submit</FormStatusButton>
      {message ? <p>{message}</p> : null}
    </form>
  );
}
