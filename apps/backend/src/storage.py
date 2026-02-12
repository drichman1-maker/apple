import os
import boto3
from botocore.exceptions import ClientError
from fastapi import UploadFile

class StorageService:
    def __init__(self):
        self.bucket = os.environ.get("S3_BUCKET_NAME", "ephemeral-uploads")
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
        )

    def upload_ephemeral_file(self, file: UploadFile, object_name: str = None):
        """
        Uploads a file to S3 with an expiration tag or lifecycle policy.
        """
        if object_name is None:
            object_name = file.filename

        try:
            # Upload with 'Ephemeral' tag for lifecycle rule to clean up
            self.s3.upload_fileobj(
                file.file, 
                self.bucket, 
                object_name,
                ExtraArgs={'Tagging': 'retention=24h'} 
            )
        except ClientError as e:
            print(f"S3 Upload Error: {e}")
            return False
        return True

    def generate_presigned_url(self, object_name: str, expiration=3600):
        try:
            response = self.s3.generate_presigned_url('get_object',
                                                    Params={'Bucket': self.bucket,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
        except ClientError as e:
            print(f"S3 Presign Error: {e}")
            return None
        return response
