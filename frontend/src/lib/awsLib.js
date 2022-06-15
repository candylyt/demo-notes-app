import { Storage } from "aws-amplify";

//takes a file obj as a param
export async function s3Upload(file) {
  //unique file name generated using the current timestamp
  const filename = `${Date.now()}-${file.name}`;

  //upload the file to the user's folder in S3
  //by Storage.vault.put()
  //if uploading publicly, then Storage.put()
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}
