import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';

// Crear solicitud
export const createSolicitud = async (solicitudData) => {
  try {
    console.log('📝 Creando solicitud en Firebase:', solicitudData);
    
    const docRef = await addDoc(collection(db, 'solicitudes'), {
      nombreCliente: solicitudData.nombreCliente,
      cedula: solicitudData.cedula,
      monto: solicitudData.monto,
      plazo: solicitudData.plazo,
      producto: solicitudData.producto,
      estado: 'Pendiente',
      createdAt: serverTimestamp()
    });
    
    console.log('✅ Solicitud creada con ID:', docRef.id);
    
    return {
      id: docRef.id,
      ...solicitudData,
      estado: 'Pendiente'
    };
  } catch (error) {
    console.error('❌ Error al crear solicitud:', error);
    throw error;
  }
};

// Obtener todas las solicitudes
export const getAllSolicitudes = async () => {
  try {
    console.log('📥 Obteniendo solicitudes de Firebase...');
    
    const q = query(
      collection(db, 'solicitudes'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const solicitudes = [];
    
    querySnapshot.forEach((doc) => {
      solicitudes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ ${solicitudes.length} solicitudes obtenidas`);
    return solicitudes;
  } catch (error) {
    console.error('❌ Error al obtener solicitudes:', error);
    throw error;
  }
};

// Eliminar solicitud
export const deleteSolicitud = async (id) => {
  try {
    console.log('🗑️ Eliminando solicitud:', id);
    await deleteDoc(doc(db, 'solicitudes', id));
    console.log('✅ Solicitud eliminada correctamente');
  } catch (error) {
    console.error('❌ Error al eliminar solicitud:', error);
    throw error;
  }
};

// Actualizar solicitud (por si lo necesitas después)
export const updateSolicitud = async (id, solicitudData) => {
  try {
    console.log('📝 Actualizando solicitud:', id);
    const solicitudRef = doc(db, 'solicitudes', id);
    await updateDoc(solicitudRef, {
      ...solicitudData,
      updatedAt: serverTimestamp()
    });
    console.log('✅ Solicitud actualizada correctamente');
  } catch (error) {
    console.error('❌ Error al actualizar solicitud:', error);
    throw error;
  }
};
