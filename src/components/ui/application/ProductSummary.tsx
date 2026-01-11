

const staticDevice = {
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923777972',
    name: 'iPhone 15 Pro Max 256GB Blue Titanium',
    color: 'Blue Titanium',
    capacity: '256GB',
    tenure: 36,
    program_fee: '0.00',
    price: '225.00',
};

const ProductSummary = () => {
    const device = staticDevice;
    return (
        <div className="bg-gray-100 w-full md:w-96 min-h-full flex flex-col gap-2 p-4 rounded-md">
            <h4 className="font-bold text-lg mb-2">Product Summary</h4>
            <img
                src={device.image}
                alt={device.name}
                className="h-48 w-full object-contain mx-auto mb-2 rounded"
            />
            <div className="flex flex-col mb-2">
                <span className="font-semibold">{device.name}</span>
                <span className="text-sm text-gray-500">
                    {device.color} / {device.capacity} / {device.tenure} Months
                </span>
            </div>
            <div className="mt-6 flex justify-between">
                <span>Program Fee:</span>
                <span className="text-md font-semibold">RM {device.program_fee}</span>
            </div>
            <div className="flex justify-between">
                <span>Monthly Payment:</span>
                <span className="text-md font-semibold">RM {device.price}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-bold">Total Upfront Payment:</span>
                <span className="text-md font-bold">
                    RM {(parseFloat(device.price) + parseFloat(device.program_fee)).toFixed(2)}
                </span>
            </div>
        </div>
    );
};

export default ProductSummary;
