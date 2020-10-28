import S3 from 'react-aws-s3';

export const uploadFile = async (file) => {
  const newFileName = file.name.slice(0, file.name.lastIndexOf('.'));

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
  }
  
  const data = await upload(file, newFileName, config);
  return `https://cards-images.s3-eu-central-1.amazonaws.com/${data.key}`;
}


const upload = (file, newFileName, config) => {
  return new Promise((res, rej) => {
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then(data => {
      if (data.status === 204) {
        res(data);
      } else {
        rej();
      }
    });  
  });
}