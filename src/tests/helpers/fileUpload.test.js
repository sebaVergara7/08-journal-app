import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dghix3cvc',
    api_key: '624684698771876',
    api_secret: 'Rs1rYvDTV75SrvFnK13Mk0MqQTo'
});

describe('Pruebas en fileUpload.test.js', () => {

    test('debe de cargar un archivo y retornar el URL', async () => {

        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        //Borrar imagen por id
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        const { deleted } = await cloudinary.v2.api.delete_resources(imageId);
        expect( deleted ).toEqual({ [imageId]: "deleted" });

    });

    test('debe de retornar un error', async () => {

        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect(url).toBe(null);

    })

})