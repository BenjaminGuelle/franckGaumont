import { FirestoreWrapper } from '../dataManager/firestore.wrapper';
import { PublicationModel } from '../../shared/models/publication/Publication.model';

import * as admin from 'firebase-admin';

admin.initializeApp();
const fs = new FirestoreWrapper;

async function addPriorityToPublications() {
  const snapshot = await fs.getAll<PublicationModel>('PUBLICATIONS');

  snapshot.forEach((publication) => {
    try {
      fs.update('PUBLICATIONS', publication.uid, {priority: false});
      console.log(`${publication.uid} à été mis à jour avec le champ priority défini sur false`);
    } catch (e) {
      console.log(`${publication.uid} error`);
    }
  });

  // Applique toutes les mises à jour dans un batch pour être plus efficace
  console.log('Tous les documents ont été mis à jour avec le champ priority défini sur false');
}

addPriorityToPublications().catch(console.error);