import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, PlusCircle, ImageIcon, Trash2 } from 'lucide-react'
import uploadMultipleImages from '../uploadMultipleImages uploadMultipleImages uploadMultipleImages'
import { UseGlobalContext } from '../Context'

export default function AddProduct() {
    const {apiUrl} = UseGlobalContext();
    const [step, setStep] = useState(0)
    const labels = ['Choose', 'Main', 'Details', 'Media', "Preview"]
    const [type, setType] = useState('product') // 'product' | 'dog'
    const [tagInput, setTagInput] = useState('')
    const fileInputRef = useRef(null);
    const [loding, setLoding] = useState(false);

    const [data, setData] = useState({
        // shared
        name: '',
        description: '',
        category: '',
        price: '',
        discountPrice: '',
        location: '',
        isAvailable: true,
        stock: 1,
        seller: 'Simba-Store',
        status: 'active',
        createdAt: new Date().toISOString(),

        // product-specific
        weight: '',

        // dog-specific
        breed: '',
        age: '',
        gender: '',

        // media & extras
        images: [], // { file, url }
        tags: [],
    })

    /* ---------- helpers ---------- */
    const update = (patch) => setData((d) => ({ ...d, ...patch }))

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        // Prevent more than 5 images
        const total = data.images.length + files.length;
        if (total > 5) {
            alert("You can only upload a maximum of 5 images.");
            return;
        }

        const mapped = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));

        update({ images: [...data.images, ...mapped] });
    };


    const removeImage = (index) => {
        const items = data.images.slice()
        // revoke to prevent memory leak
        if (items[index] && items[index].url) URL.revokeObjectURL(items[index].url)
        items.splice(index, 1)
        update({ images: items })
    }

    const handleTagAdd = () => {
        const t = tagInput.trim()
        if (!t) return
        if (!data.tags.includes(t)) update({ tags: [...data.tags, t] })
        setTagInput('')
    }

    const removeTag = (t) => update({ tags: data.tags.filter((tg) => tg !== t) })

    const canNextFromChoose = () => !!type
    const canNextFromMain = () => {
        if (type === 'product') {
            return data.name && data.description && data.category && data.location && data.price !== ''
        }
        if (type === 'dog') {
            return data.name && data.description && data.category && data.location && data.price !== ''
        }
        return false
    }

    const canNextFromDetails = () => {
        if (type === 'product' && step === 2 && data.stock > 0 && data.stock !== undefined) {
            return true // no required fields for product details
        }
        if (type === "dog" && step === 2) {
            return data.breed && data.age && data.gender
        }
        return false
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.images.length === 0) {
            alert("At least one image is required.");
            return;
        }
        setLoding(true);
        try {
            const payload = { ...data }
            const imageUrls = await uploadMultipleImages(data.images.map((i) => i.file) || []);
            payload.images = imageUrls;
            if (imageUrls === null || imageUrls.length === 0) {
                alert("Images upload error.");
                return;
            };
            try {
                const response = await fetch(`${apiUrl}/products`, {
                    method: "POST"
                });
                if (response.ok) {
                    console.log("Submitting product:", payload);
                    alert("Product submitted! Check console for data.");
                    window.location.reload();
                }
            } catch (error) {
                console.log("ProductP-Err:", error);
            }
        } catch (error) {
            console.log("Submission error:", error);
            alert("There was an error submitting the product.");
        }
        finally {
            setLoding(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8"
            >
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Add new listing</h1>
                    <p className="text-sm text-gray-500 mt-1">Choose type and fill the form. Use Next to reveal more fields.</p>
                </header>

                {/* progress */}
                <div className="flex hidden md:flex items-center gap-3 mb-8">
                    {labels.map((label, i) => (
                        <div key={label} className="flex-1">
                            <div className={`w-full h-2 rounded-full ${i <= step ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                            <p className="text-xs text-center mt-2">{label}</p>
                        </div>
                    ))}
                </div>

                <div className="block md:hidden items-center gap-3 mb-8">
                    <div className="flex-1">
                        <div className={`w-full h-2 rounded-full bg-yellow-500`}></div>
                        <p className="text-xs text-center mt-2">{labels[step]}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="choose"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.35 }}
                                className="space-y-4"
                            >
                                <p className="text-gray-600">What are you adding?</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setType('product')}
                                        className={`p-6 rounded-xl border ${type === 'product' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white'} flex flex-col items-start`}
                                    >
                                        <div className="text-sm font-semibold">Product</div>
                                        <div className="text-xs text-gray-500 mt-2">Toys, food, accessories, supplements</div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setType('dog')}
                                        className={`p-6 rounded-xl border ${type === 'dog' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white'} flex flex-col items-start`}
                                    >
                                        <div className="text-sm font-semibold">Dog</div>
                                        <div className="text-xs text-gray-500 mt-2">Listing an animal for sale / adoption</div>
                                    </button>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => canNextFromChoose() && setStep(1)}
                                        disabled={!canNextFromChoose()}
                                        className="bg-yellow-500 disabled:opacity-50 text-white px-5 py-2 rounded-lg flex items-center gap-2"
                                    >
                                        Next <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="main"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.35 }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input name="name" value={data.name} onChange={(e) => update({ name: e.target.value })} required className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea name="description" value={data.description} onChange={(e) => update({ description: e.target.value })} required rows={4} className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {
                                        /* Category could be dynamic from API in real app */
                                        type === 'product' ?
                                            (<div>
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <select name="category" value={data.category} onChange={(e) => update({ category: e.target.value })} required className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400">
                                                    <option value="">Choose category</option>
                                                    <option>Dog Essentials</option>
                                                    <option>Food & Supplements</option>
                                                    <option>Health & Drugs</option>
                                                    <option>Toys & Accessories</option>
                                                    <option>Grooming & Hygiene</option>
                                                </select>
                                            </div>)
                                            :
                                            (<div>
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <select name="category" value={data.category} onChange={(e) => update({ category: e.target.value })} required className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400">
                                                    <option value="">Choose category</option>
                                                    <option>Dog</option>
                                                </select>
                                            </div>)
                                    }

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <input name="location" value={data.location} onChange={(e) => update({ location: e.target.value })} placeholder="e.g. Lagos, Nigeria" required className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price (₦)</label>
                                        <input name="price" type="number" value={data.price} onChange={(e) => update({ price: e.target.value })} required className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Discount price (optional)</label>
                                        <input name="discountPrice" type="number" value={data.discountPrice} onChange={(e) => update({ discountPrice: e.target.value })} className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400" />
                                    </div>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <button type="button" onClick={() => setStep(0)} className="flex items-center gap-2 border px-4 py-2 rounded-lg">
                                        <ArrowLeft size={16} /> Back
                                    </button>

                                    <button type="button" onClick={() => canNextFromMain() ? setStep(2) : alert('Please fill required fields')} className="bg-yellow-500 text-white px-5 py-2 rounded-lg flex items-center gap-2">
                                        Next <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.35 }}
                                className="space-y-4"
                            >
                                {type === 'dog' ? (
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Breed</label>
                                            <input value={data.breed} onChange={(e) => update({ breed: e.target.value })} className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Age</label>
                                            <input value={data.age} onChange={(e) => update({ age: e.target.value })} placeholder="e.g. 6 months" className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                                            <select value={data.gender} onChange={(e) => update({ gender: e.target.value })} className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400">
                                                <option value="">Select</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Weight (optional)</label>
                                            <input value={data.weight} onChange={(e) => update({ weight: e.target.value })} placeholder="e.g. 500g / 5kg" className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                                            <input type="number" min={0} value={data.stock} onChange={(e) => update({ stock: Number(e.target.value) })} className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400" />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tags (optional)</label>
                                    <div className="flex gap-2 mt-2">
                                        <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="type tag and press +" className="flex-1 rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400" />
                                        <button type="button" onClick={handleTagAdd} className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"><PlusCircle size={16} /> Add</button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {data.tags.map((t) => (
                                            <span key={t} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                                {t}
                                                <button type="button" onClick={() => removeTag(t)} className="text-yellow-700 opacity-80">✕</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 border px-4 py-2 rounded-lg"><ArrowLeft size={16} /> Back</button>
                                    <button type="button" onClick={() => canNextFromDetails() ? setStep(3) : alert("Fill up the required field!")} className="bg-yellow-500 text-white px-5 py-2 rounded-lg flex items-center gap-2">Next <ArrowRight size={16} /></button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="media"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.35 }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Images</label>
                                    <p className="text-xs text-gray-500">Upload images (Max-5). First image will be primary.</p>

                                    <div className="mt-3 flex items-center gap-3">
                                        <input ref={fileInputRef} onChange={handleFileChange} type="file" accept="image/*" multiple className="hidden" />
                                        <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                                            <ImageIcon size={16} /> Choose images
                                        </button>
                                        <span className="text-sm text-gray-500">{data.images.length} selected</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        {data.images.map((img, i) => (
                                            <div key={i} className="relative rounded-lg overflow-hidden border">
                                                <img src={img.url} alt={`preview-${i}`} className="w-full h-28 object-cover" />
                                                <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"><Trash2 size={14} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <button type="button" onClick={() => setStep(2)} className="flex items-center gap-2 border px-4 py-2 rounded-lg"><ArrowLeft size={16} /> Back</button>
                                    <button type="button" onClick={() => setStep(4)} className="bg-yellow-500 text-white px-5 py-2 rounded-lg flex items-center gap-2">Next <ArrowRight size={16} /> </button>
                                </div>

                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.35 }}
                                className="space-y-6"
                            >
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Preview your listing</h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-2">Basic Info</h3>
                                        <p><strong>Name:</strong> {data.name}</p>
                                        <p><strong>Category:</strong> {data.category}</p>
                                        <p><strong>Price:</strong> ₦{data.price}</p>
                                        {data.discountPrice && <p><strong>Discount:</strong> ₦{data.discountPrice}</p>}
                                        <p><strong>Location:</strong> {data.location}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-2">Details</h3>
                                        {type === 'dog' ? (
                                            <>
                                                <p><strong>Breed:</strong> {data.breed}</p>
                                                <p><strong>Age:</strong> {data.age}</p>
                                                <p><strong>Gender:</strong> {data.gender}</p>
                                            </>
                                        ) : (
                                            <>
                                                {data.weight && <p><strong>Weight:</strong> {data.weight}</p>}
                                                <p><strong>Stock:</strong> {data.stock}</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {data.tags?.length > 0 && (
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-2">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {data.tags.map((t) => (
                                                <span key={t} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {data.images?.length > 0 && (
                                    <div>
                                        <h3 className="text-sm text-gray-500 mb-2">Images</h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            {data.images.map((img, i) => (
                                                <img key={i} src={img.url} alt={`preview-${i}`} className="rounded-lg object-cover h-28 w-full border" />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between mt-6">
                                    <button disabled={loding} type="button" onClick={() => setStep(3)} className="flex items-center gap-2 border px-4 py-2 rounded-lg">
                                        <ArrowLeft size={16} /> Back
                                    </button>

                                    {/* this uses your existing handleSubmit (form onSubmit) */}
                                    <button disabled={loding} type="button" onClick={handleSubmit} className="bg-green-600 text-white px-5 py-2 rounded-lg">
                                        {loding ? 'Submitting...' : 'Confirm & Submit'}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </form>
            </motion.div>
        </div>
    )
}
