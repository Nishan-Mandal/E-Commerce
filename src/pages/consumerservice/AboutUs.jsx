import React, { useEffect, useState } from 'react';
import { fireDB } from '../../firebase/firebaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import Layout from '../../components/layout/Layout';

function AboutUs() {
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
      
    const fetchAboutUsFiles = async () => {
      try {
        const documentsCollection = collection(fireDB, 'documents');
        const aboutUsDocRef = doc(documentsCollection, 'About Us');
        const docSnapshot = await getDoc(aboutUsDocRef);

        if (docSnapshot.exists()) {
          const url = docSnapshot.data().url;
          // Set the file URL in the state
          setFileUrl(url);
        } else {
          console.log('No document found with the name "About Us".');
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    // Call the function to fetch files when the component mounts
    fetchAboutUsFiles();
  }, []);

  return (
    <Layout>
      <div>
        {fileUrl && (
          <iframe
            title="PDF Viewer"
            src={fileUrl}
            width="100%"
            height="700px"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </Layout>
  );
}

export default AboutUs;
