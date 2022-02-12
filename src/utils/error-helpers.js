export const mapSequelizeErrorToErrorMessage =
    (errors) => {
        let errorFields = "";
        let errorMessage = "";

        errors.errors.forEach(({message, path}) => {
            errorMessage = `${errorMessage}${message} `;
            errorFields = `${errorFields}${path} `;
        });

        return `Fields: [ ${errorFields}], message: [ ${errorMessage}]`;
    };
