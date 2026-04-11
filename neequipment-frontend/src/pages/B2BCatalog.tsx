import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ChevronRight, Plus, Grid, List, Factory, Shield, Stethoscope, Droplets, Wheat, Monitor, Sofa, Waves, Tv, Dumbbell, Lock, LogIn, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';
import api from '@/services/api';
import { useQuote } from '@/contexts/QuoteContext';
import { useAuth } from '@/contexts/AuthContext';
import { getProductImageUrl } from '@/utils/imageUtils';

// We will fetch categories dynamically from the backend
interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  sku: string;
  price: number;
  category?: { id: number; name: string; slug: string };
  images?: { image_path: string; is_primary: boolean }[];
}

const B2BCatalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{id: number | string, name: string, slug?: string, icon?: any}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { items, addItem } = useCart();
  const { openQuoteForm } = useQuote();
  const { user } = useAuth();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(productsRes.data);
        
        // Dynamically build category list with 'Todos os Produtos' at the top
        const fetchedCats = categoriesRes.data.map((c: any) => ({
          ...c,
          id: c.slug, // Use slug for filtering
          icon: Factory // Default icon for dynamic categories
        }));
        
        // Sort categories: "Industrial" should come first (after "all")
        const sortedCats = fetchedCats.sort((a: any, b: any) => {
          const isAIndustrial = a.name.toLowerCase().includes('industrial') || a.slug.toLowerCase().includes('industrial');
          const isBIndustrial = b.name.toLowerCase().includes('industrial') || b.slug.toLowerCase().includes('industrial');
          if (isAIndustrial && !isBIndustrial) return -1;
          if (!isAIndustrial && isBIndustrial) return 1;
          return 0;
        });

        setCategories([
          { id: 'all', name: 'Todos os Produtos', icon: Grid },
          ...sortedCats
        ]);

      } catch (error) {
        console.error('Error fetching B2B data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToQuote = (product: Product) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      category: 'industrial',
      specifications: `${product.brand} | ${product.sku}`
    });
    toast.success(t.b2bCatalog.addedToQuote, { 
      description: product.name
    });
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || p.category?.slug === selectedCategory;
    const nameMatch = (p.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = (p.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = !searchTerm || nameMatch || descMatch;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20 pb-20" ref={ref}>
      <div className="bg-gradient-to-r from-navy-dark to-navy py-12 mb-8">
        <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                {t.b2bCatalog.title} <span className="text-gold">{t.b2bCatalog.titleHighlight}</span>
              </h1>
              <p className="text-white/70 mt-2">Equipamento Industrial — {t.b2bCatalog.subtitle}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="flex gap-4">
              <Input
                placeholder={t.b2bCatalog.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl"
              />
              <Button onClick={() => navigate('/signup')} className="bg-gold hover:bg-gold-light text-navy-dark font-bold rounded-xl">{t.b2bCatalog.registerCompany}</Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="lg:w-72 flex-shrink-0">
            <div className="glass-card p-6 sticky top-36">
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">{t.b2bCatalog.industrialSectors}</h3>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id || (!selectedCategory && cat.id === 'all');
                  return (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id === 'all' ? null : String(cat.id))} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 ${isActive ? 'bg-navy-dark/10 text-navy-dark font-semibold' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}>
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-gold' : ''}`} />
                      <span className="truncate">{cat.name}</span>
                      {cat.id !== 'all' && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          {products.filter(p => p.category?.slug === cat.id).length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 p-4 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl">
                <h4 className="font-bold text-foreground text-sm mb-2">{t.b2bCatalog.needBulk}</h4>
                <p className="text-xs text-muted-foreground mb-4">{t.b2bCatalog.bulkDesc}</p>
                <Button 
                  onClick={() => {
                    const message = encodeURIComponent(language === 'PT' ? 'Olá! Gostaria de falar com o comercial sobre o catálogo B2B.' : 'Hello! I would like to talk to sales about the B2B catalog.');
                    window.open(`https://wa.me/258843114354?text=${message}`, '_blank');
                  }}
                  className="w-full bg-gold hover:bg-gold-light text-navy-dark font-bold text-sm rounded-xl"
                >
                  {t.b2bCatalog.talkCommercial}
                </Button>
              </div>
            </div>
          </motion.aside>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {t.b2bCatalog.showing} <span className="text-foreground font-semibold">{filteredProducts.length} {t.b2bCatalog.products}</span>
                {selectedCategory && selectedCategory !== 'all' && (
                  <button onClick={() => setSelectedCategory(null)} className="ml-2 text-gold hover:underline text-xs">Limpar filtro</button>
                )}
              </p>
              <div className="flex border border-border rounded-xl overflow-hidden">
                <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-navy-dark text-white' : 'bg-card'}`}><Grid className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-navy-dark text-white' : 'bg-card'}`}><List className="w-4 h-4" /></button>
              </div>
            </div>

            {!user && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-navy-dark/5 border border-dashed border-navy-dark/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    {t.catalog.b2bNotice}
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/login')} 
                  size="sm" 
                  className="bg-gold hover:bg-gold-light text-navy-dark font-bold rounded-xl whitespace-nowrap shadow-lg shadow-gold/20"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {language === 'PT' ? 'Entrar / Login' : 'Sign In'}
                </Button>
              </motion.div>
            )}

            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
              : "flex flex-col gap-6"
            }>
              {isLoading ? (
                <div className="col-span-full py-20 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
                </div>
              ) : filteredProducts.map((product, index) => {
                const primaryImage = product.images?.find(img => img.is_primary)?.image_path || product.images?.[0]?.image_path;
                const imageUrl = getProductImageUrl(primaryImage);

                if (viewMode === 'list') {
                  return (
                    <motion.div 
                      key={product.id} 
                      onClick={() => navigate(`/product/${product.id}`)} 
                      initial={{ opacity: 0, x: -20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: index * 0.05 }} 
                      className="glass-card overflow-hidden hover:shadow-xl transition-all group cursor-pointer flex flex-col sm:flex-row items-center gap-6 p-4 border border-border/50"
                    >
                      <div className="w-full sm:w-48 h-48 sm:h-32 shrink-0 rounded-xl overflow-hidden relative">
                        <Badge className="absolute top-2 left-2 z-10 bg-navy-dark/80 backdrop-blur-sm text-white text-[8px] px-1.5 py-0">
                          {product.category?.name || 'Industrial'}
                        </Badge>
                        <img src={imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      
                      <div className="flex-1 flex flex-col sm:flex-row justify-between gap-6 w-full">
                        <div className="space-y-2 text-left">
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg text-foreground group-hover:text-gold transition-colors">{product.name}</h3>
                            <Badge variant="outline" className="text-[10px] border-gold/20 text-gold uppercase tracking-tighter h-5">{product.brand || 'Original'}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-[11px] text-muted-foreground tabular-nums">
                            <span className="bg-muted px-2 py-0.5 rounded font-mono">SKU: {product.sku}</span>
                            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-gold" /> Qualidade Garantida</span>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center justify-center gap-3 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-border/50 sm:pl-6">
                           {user?.role !== 'admin' && (
                            <Button 
                              onClick={(e) => { e.stopPropagation(); handleAddToQuote(product); }} 
                              className="bg-gold hover:bg-gold-light text-navy-dark font-bold text-xs h-10 w-full sm:w-32 rounded-xl shadow-lg transition-all active:scale-95"
                            >
                              {t.b2bCatalog.quote}
                              <Plus className="w-4 h-4 ml-2" />
                            </Button>
                           )}
                           <Button variant="ghost" className="text-xs text-muted-foreground hover:text-navy-dark h-10 w-full sm:w-32 rounded-xl">
                              Ver Detalhes
                           </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={product.id} onClick={() => navigate(`/product/${product.id}`)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="glass-card overflow-hidden hover:shadow-2xl transition-all group cursor-pointer relative flex flex-col h-full">
                    <div className="aspect-[4/4.5] relative overflow-hidden shrink-0">
                      <Badge className="absolute top-3 left-3 z-10 bg-navy-dark/90 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-lg border-gold/20 shadow-lg">
                        {product.category?.name || 'Industrial'}
                      </Badge>
                      <img src={imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{product.brand || 'Original'}</span>
                        <div className="flex gap-1 opacity-20">
                          <div className="w-1 h-1 rounded-full bg-navy-dark" />
                          <div className="w-1 h-1 rounded-full bg-navy-dark" />
                          <div className="w-1 h-1 rounded-full bg-navy-dark" />
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-foreground mb-3 line-clamp-1 text-base group-hover:text-gold transition-colors">{product.name}</h3>
                      
                      <div className="flex items-center gap-4 mb-4 text-[9px] text-muted-foreground uppercase font-semibold tracking-tighter">
                        <span className="flex items-center gap-1.5"><Truck className="w-3 h-3 text-gold" /> Envio Ágil</span>
                        <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-gold" /> Garantia</span>
                      </div>
                      
                      <div className="mt-auto space-y-4">
                        {user?.role !== 'admin' && (
                          <Button 
                            onClick={(e) => { e.stopPropagation(); handleAddToQuote(product); }} 
                            className="w-full bg-gold hover:bg-gold-light text-navy-dark font-bold text-xs h-10 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                          >
                            {t.b2bCatalog.quote}
                            <Plus className="w-4 h-4" />
                          </Button>
                        )}
                        
                        <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/10">
                          <span className="text-[10px] text-muted-foreground font-mono tabular-nums bg-muted/50 px-2 py-0.5 rounded">SKU: {product.sku}</span>
                          <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-whatsapp animate-pulse" />
                             <span className="text-[9px] font-bold text-whatsapp uppercase tracking-tighter">Disponível</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {/* end products map */}
            </div>

            {filteredProducts.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-2">Nenhum produto encontrado</p>
                <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou termos de pesquisa.</p>
                <Button variant="outline" onClick={() => { setSelectedCategory(null); setSearchTerm(''); }} className="mt-4">Limpar filtros</Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default B2BCatalog;
