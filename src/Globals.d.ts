declare module "*.module.css"{
    interface ICClassNames {
        [className: string]: string;
    }
    const className: ICClassNames;
    export = className;
};
