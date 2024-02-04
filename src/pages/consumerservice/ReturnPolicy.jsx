import React, { useEffect, useState } from 'react';
import { fireDB } from '../../firebase/firebaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import Layout from '../../components/layout/Layout';

function ReturnPolicy() {
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
      
    const fetchReturnPolicy = async () => {
      try {
        const documentsCollection = collection(fireDB, 'documents');
        const docRef = doc(documentsCollection, 'Return Policy');
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const url = docSnapshot.data().url;
          // Set the file URL in the state
          setFileUrl(url);
        } else {
          console.log('No document found with the name "Return Policy".');
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    // Call the function to fetch files when the component mounts
    fetchReturnPolicy();
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

export default ReturnPolicy;
